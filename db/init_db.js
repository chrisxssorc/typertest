const client = require('./client');
const {createPassage} = require('./index');

async function buildTables() {
    try {
        client.connect();

        //drop tables
        console.log('Starting to DROP TABLES...');
        await client.query(
            `
            DROP TABLE IF EXISTS passages;
            `)
        console.log('Successfully DROPPED TABLES!');

        //build tables
        console.log('Attempting to CREATE TABLES...');
        await client.query(
            `
            CREATE TABLE passages(
                id SERIAL PRIMARY KEY,
                author VARCHAR(255),
                title VARCHAR(255),
                excerpt TEXT NOT NULL
            );
            `);
        console.log('Successfully CREATED TABLES!');
    } catch (error) {
        throw error;
    }
}

async function populateInitialPassages() {
    console.log('Trying to create passages...')
    try {
        const passagesToCreate = [
            {
                author: 'Jack Kerouac',
                title: 'On The Road',
                excerpt: 'The only people for me are the mad ones, the ones who are mad to live, mad to talk, mad to be saved, desirous of everything at the same time, the ones who never yawn or say a commonplace thing, but burn, burn, burn like fabulous yellow roman candles exploding like spiders across the stars.'
            },
            {
                author: 'Gabriel Garcí­a Márquez',
                title: 'Love in the Time of Cholera',
                excerpt: 'He allowed himself to be swayed by his conviction that human beings are not born once and for all on the day their mothers give birth to them, but that life obliges them over and over again to give birth to themselves.'
            },
            {
                author: 'Bret Easton Ellis',
                title: 'American Psycho',
                excerpt: 'There is an idea of a Patrick Bateman, some kind of abstraction, but there is no real me, only an entity, something illusory, and though I can hide my cold gaze and you can shake my hand and feel flesh gripping yours and maybe you can even sense our lifestyles are probably comparable: I simply am not there.'
            },
            {
                author: 'Lidia Yuknavitch',
                title: 'The Chronology of Water',
                excerpt: "I don't have any problem understanding why people flunk out of college or quit their jobs or cheat on each other or break the law or spray-paint walls. A little bit outside of things is where some people feel each other. We do it to replace the frame of family. We do it to erase and remake our origins in their own images. To say, I too was here."
            },
            {
                author: 'Pablo Neruda',
                title: '100 Love Sonnets',
                excerpt: 'I love you without knowing how, or when, or from where. I love you simply, without problems or pride: I love you in this way because I do not know any other way of loving but this, in which there is no I or you, so intimate that your hand upon my chest is my hand, so intimate that when I fall asleep your eyes close.'
            },
            {
                author: 'Louisa May Alcott',
                title: 'Little Women',
                excerpt: "There are many Beths in the world, shy and quiet, sitting in corners till needed, and living for others so cheerfully that no one sees the sacrifices till the little cricket on the hearth stops chirping, and the sweet, sunshiny presence vanishes, leaving silence and shadow behind."
            },
            {
                author: 'C. S. Lewis',
                title: 'The Lion, The Witch, And The Wardrobe',
                excerpt: 'Wrong will be right, when Aslan comes in sight, At the sound of his roar, sorrows will be no more, When he bares his teeth, winter meets its death, And when he shakes his mane, we shall have spring again.'
            },
            {
                author: 'Haruki Murakami',
                title: 'Kafka On The Shore',
                excerpt: "And once the storm is over you won’t remember how you made it through, how you managed to survive. You won’t even be sure, in fact, whether the storm is really over. But one thing is certain. When you come out of the storm you won’t be the same person who walked in. That’s what this storm’s all about."
            },
            {
                author: 'Ernest Hemingway',
                title: 'A Farewell To Arms',
                excerpt: 'In the late summer of that year we lived in a house in a village that looked across the river and the plain to the mountains. In the bed of the river there were pebbles and boulders, dry and white in the sun, and the water was clear and swiftly moving and blue in the channels. Troops went by the house and down the road and the dust they raised powdered the leaves of the trees.'
            }
        ];

        const passages = await Promise.all(passagesToCreate.map((passage) => {
            return createPassage(passage);
        }));

        console.log('Passages Created: ', passages);
        console.log('Finished creating passages!');
    } catch (error) {
        throw error;
    }
}

buildTables()
    .then(populateInitialPassages)
    .catch(console.error)
    .finally(() => client.end());
