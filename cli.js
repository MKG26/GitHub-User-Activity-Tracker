
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to fetch events based on route selection
async function fetchEvents(route, body = null) {
    try {
        const url = `http://localhost:3000/api/${route}`;
        const options = body
            ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
            : { method: 'GET' };

        const response = await fetch(url, options);
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
}

// CLI Interaction
rl.question('Enter your GitHub username: ', (username) => {
    if (!username) {
        console.log('❌ Username is required!');
        rl.close();
        return;
    }

    console.log('🔄 Fetching events...');
    console.log('1️⃣ List all events for the user (POST)');
    console.log('2️⃣ Get public events for a user (GET)');
    console.log('3️⃣ Get event list for a user (GET)');

    rl.question('Choose an option (1-3): ', (option) => {
        switch (option) {
            case '1':
                fetchEvents('listEventsForUses', { username });
                break;
            case '2':
                fetchEvents(`publicEventsForAUser/${username}`);
                break;
            case '3':
                fetchEvents(`getEventListForUser/${username}`);
                break;
            default:
                console.log('❌ Invalid option selected.');
                rl.close();
        }
    });
});
