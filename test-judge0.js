const axios = require('axios');

async function test() {
    try {
        const submission = [
            {
                source_code: Buffer.from("print('hello')").toString('base64'),
                language_id: 71, // Python
                stdin: Buffer.from("").toString('base64'),
                expected_output: Buffer.from("hello\n").toString('base64')
            }
        ];
        console.log("Submitting batch...");
        const { data } = await axios.post('http://localhost:2358/submissions/batch?base64_encoded=true', { submissions: submission });
        console.log("Submission response:", data);
        
        const tokens = data.map(res => res.token);
        
        let done = false;
        while (!done) {
            const poll = await axios.get('http://localhost:2358/submissions/batch', {
                params: {
                    tokens: tokens.join(","),
                    base64_encoded: true
                }
            });
            const results = poll.data.submissions;
            const isAllDone = results.every(r => r.status.id !== 1 && r.status.id !== 2);
            if (isAllDone) {
                console.log("All done:", JSON.stringify(results, null, 2));
                break;
            }
            await new Promise(r => setTimeout(r, 1000));
        }
    } catch (e) {
        console.error("Error:", e.response ? e.response.data : e.message);
    }
}

test();
