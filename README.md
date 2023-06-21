# pnpm-user-agent-repro

1. Install dependencies for the `proxy-server` package:
    ```bash
    pushd proxy-server && pnpm install && popd
    ```

2. Run the proxy server (binds to `http://localhost:8080`):
    ```bash
    ./proxy-server/proxy-server.js
    ```

    Leave this running and open a separate tab.

3. Install dependencies for the `hello-world` package:
    ```bash
    pushd hello-world
    rm -rf "node_modules" "build" || true && mkdir -p build

    # Attempt to override the user-agent
    export NPM_CONFIG_USER_AGENT=test

    # Use a temporary store directory to force PNPM to re-download packages from the proxy, which lets
    # us see the user-agent header that's being sent
    pnpm install --force --store-dir "build/pnpm-store" --registry http://localhost:8080

    popd
    ```

4. Observe the requests logged by the proxy server:
    ```
    /lodash/-/lodash-4.17.21.tgz -> pnpm/7.21.0 npm/? node/v16.17.1 darwin arm64
    ```

    I expected this to log: 

    ```
    /lodash/-/lodash-4.17.21.tgz -> test
    ```
