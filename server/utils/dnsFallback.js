import dns from "node:dns";

const enabled =
  process.env.DNS_FALLBACK === "true" ||
  (process.env.DNS_FALLBACK !== "false" &&
    process.env.NODE_ENV !== "production");

if (enabled) {
  const originalLookup = dns.lookup.bind(dns);
  const resolver = new dns.Resolver();
  const warned = new Set();

  resolver.setServers(["1.1.1.1", "8.8.8.8"]);

  dns.lookup = function lookup(hostname, options, callback) {
    if (typeof options === "function") {
      callback = options;
      options = {};
    }

    const lookupOptions = options || {};

    return originalLookup(hostname, lookupOptions, (error, address, family) => {
      if (!error || error.code !== "ENOTFOUND") {
        return callback(error, address, family);
      }

      if (!warned.has(hostname)) {
        warned.add(hostname);
        console.warn(
          `[dns] OS lookup failed for ${hostname}; retrying with public DNS`,
        );
      }

      const familyValue =
        typeof lookupOptions === "number"
          ? lookupOptions
          : lookupOptions.family;
      const resolve = familyValue === 6 ? resolver.resolve6 : resolver.resolve4;

      resolve.call(resolver, hostname, (resolveError, addresses) => {
        if (resolveError || !addresses || addresses.length === 0) {
          return callback(error, address, family);
        }

        if (lookupOptions.all) {
          const resolvedFamily = familyValue === 6 ? 6 : 4;
          return callback(
            null,
            addresses.map((ip) => ({ address: ip, family: resolvedFamily })),
          );
        }

        return callback(null, addresses[0], familyValue === 6 ? 6 : 4);
      });
    });
  };
}
