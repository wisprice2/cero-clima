import http from 'node:http';
import net from 'node:net';
import dns from 'node:dns';

const resolver = new dns.promises.Resolver();
resolver.setServers([
  '2a00:1098:2b::1',
  '2a01:4f8:c2c:123f::1',
  '2a00:1098:2c::1'
]);

async function resolveHost(host) {
  try {
    const ips = await resolver.resolve6(host);
    if (ips && ips.length > 0) {
      return ips[0];
    }
  } catch {
    // Fallback to standard resolve
  }
  return host;
}

const server = http.createServer((req, res) => {
  res.writeHead(405, { 'Content-Type': 'text/plain' });
  res.end('Use CONNECT for HTTPS tunneling.');
});

server.on('connect', async (req, clientSocket, head) => {
  const [host, portStr] = req.url.split(':');
  const port = parseInt(portStr, 10) || 443;

  try {
    const targetIp = await resolveHost(host);
    const remoteSocket = net.connect({
      host: targetIp,
      port: port,
      family: targetIp.includes(':') ? 6 : 4
    }, () => {
      clientSocket.write('HTTP/1.1 200 Connection Established\r\n\r\n');
      if (head && head.length > 0) {
        remoteSocket.write(head);
      }
      clientSocket.pipe(remoteSocket);
      remoteSocket.pipe(clientSocket);
    });

    remoteSocket.on('error', (err) => {
      clientSocket.destroy(err);
    });
    clientSocket.on('error', (err) => {
      remoteSocket.destroy(err);
    });
  } catch (err) {
    clientSocket.end('HTTP/1.1 502 Bad Gateway\r\n\r\n');
  }
});

const PORT = 8888;
server.listen(PORT, '127.0.0.1', () => {
  console.log(`IPv6 NAT64 Proxy active on http://127.0.0.1:${PORT}`);
});
