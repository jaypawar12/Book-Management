const { spawn } = require('child_process');

async function runTests() {
    console.log("Starting server for testing...");
    const server = spawn('npm', ['start'], { shell: true, detached: false });

    server.stdout.on('data', (data) => {
        console.log(`Server: ${data}`);
        if (data.toString().includes('Server running')) {
            runChecks();
        }
    });

    server.stderr.on('data', (data) => console.error(`Server Error: ${data}`));

    // Timeout if server fails to start
    const timeout = setTimeout(() => {
        console.error("Timeout waiting for server to start.");
        server.kill();
        process.exit(1);
    }, 10000);

    async function runChecks() {
        clearTimeout(timeout);
        console.log("\nRunning Checks...\n");
        let passed = true;

        try {
            // Check 1: Health Check (listing books should return 200)
            console.log("Check 1: GET /api/");
            const res = await fetch('http://localhost:8000/api/');
            if (res.status === 200) {
                console.log("PASS: Server is reachable and returned 200 OK");
            } else {
                console.error(`FAIL: Expected 200, got ${res.status}`);
                passed = false;
            }

            // Add more checks here as needed

        } catch (error) {
            console.error("Test execution failed:", error);
            passed = false;
        } finally {
            console.log("\nCleaning up...");
            server.kill();
            // On Windows, child_process.kill() might not kill the tree. 
            // Often manually Ctrl+C is needed or process management.
            // For this simple script, we assume 'kill' signals node to stop or we rely on the user to stop it if it hangs.
            // To be safe on windows specifically using 'taskkill' might be better but let's try standard first.
            process.exit(passed ? 0 : 1);
        }
    }
}

runTests();
