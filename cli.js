const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter your GitHub username: ', async (username) => {
    if (!username) {
        console.log('❌ Username is required!');
        rl.close();
        return;
    }

    console.log(`🔄 Fetching events for ${username}...`);

    try {
        const response = await fetch('http://localhost:3000/api/listEventsForUses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username })
        });

        const data = await response.json();
        
        if (response.ok) {
            console.log('✅ API Response:', JSON.stringify(data, null, 2));
        } else {
            console.error(`❌ Error: ${data.message}`);
        }
    } catch (error) {
        console.error(`❌ Request failed: ${error.message}`);
    } finally {
        rl.close();
    }
});
