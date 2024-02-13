const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const cliProgress = require('cli-progress');
async function getShows() {
    try {
        const response = await axios.get('https://api.tvmaze.com/shows');
        return response.data;
    } catch (error) {
        console.error('Fehler beim Abrufen der Shows:', error);
    }
}

async function scrapePage(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const voeLinkSelector = 'a.watchEpisode[itemprop="url"]:first';
        const voeLinkElement = $(voeLinkSelector);

        let voeLink;
        if (voeLinkElement.length >  0) {
            voeLink = voeLinkElement.attr('href');
            voeLink = `http://186.2.175.5${voeLink}`;
        } else {
            voeLink = "Not found";
        }

     //   console.log(`VOE Link found on ${url}: ${voeLink || 'Not found'}`);
        return voeLink;
    } catch (error) {
        if (error.response && error.response.status ===  400) {
         //   console.warn(`Bad Request beim Scrapen der Seite ${url}, Überspringe diese Seite.`);
            return null;
        } else {
         //   console.error(`Fehler beim Scrapen der Seite ${url}:`, error);
        }
    }
}

async function scrapeSeason(show, season) {
    const promises = [];
    for (let episode =  1; episode <=  30; episode++) {
        const episodeUrl = `http://186.2.175.5/serie/stream/${encodeURIComponent(show.name)}/staffel-${season}/episode-${episode}`;
        promises.push(scrapePage(episodeUrl));
    }
    return Promise.all(promises);
}

async function main() {
    console.log("Made by Felix1337 with <3");
    console.log("For nextWatch");
    const shows = await getShows();
    const totalShows = shows.length;
    const allResults = {};
    let currentShowIndex =  1;

    const startTime = Date.now();

    // Create a new progress bar instance and start it
    const progressBar = new cliProgress.SingleBar({
        format: '{bar} {percentage}% | {value}/{total} | Time: {duration_formatted} | ETA: {eta_formatted}',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true
    }, cliProgress.Presets.shades_classic);
    progressBar.start(totalShows,  0, {
        duration_formatted: '00:00',
        eta_formatted: '00:00'
    });

    for (const show of shows) {
        show.name = show.name.replace(/\s+/g, '-');
        // Update the progress bar instead of logging to the console
        const elapsedTime = Date.now() - startTime;
        const minutesElapsed = Math.floor(elapsedTime / (60 *  1000));
        const secondsElapsed = ((elapsedTime % (60 *  1000)) /  1000).toFixed(0);
        const etaSeconds = ((elapsedTime / currentShowIndex) * (totalShows - currentShowIndex)).toFixed(0);
        const etaMinutes = Math.floor(etaSeconds /  60);
        const etaSecondsLeft = Math.floor(etaSeconds %  60);

        progressBar.update(currentShowIndex, {
            duration_formatted: `${minutesElapsed}:${secondsElapsed}`,
            eta_formatted: `${etaMinutes}:${etaSecondsLeft}`
        });

        const firstEpisodeUrl = `http://186.2.175.5/serie/stream/${encodeURIComponent(show.name)}/staffel-1/episode-1`;
        const voeLinkForFirstEpisode = await scrapePage(firstEpisodeUrl);

        if (!voeLinkForFirstEpisode || voeLinkForFirstEpisode === 'Not found') {
            currentShowIndex++;
            continue;
        }

        let foundVoeLink = false;
        let seriesData = { name: show.name, seasons: {} };

        for (let season =  1; season <=  30; season++) {
            const voeLinks = await scrapeSeason(show, season);
            const filteredLinks = voeLinks.filter(link => link !== null && link !== 'Not found');

            if (filteredLinks.length >  0) {
                seriesData.seasons[`staffel-${season}`] = filteredLinks.map((link, index) => ({
                    episode: index +  1,
                    link: link
                }));
                foundVoeLink = true;
            } else {
                break;
            }
        }

        if (foundVoeLink) {
            allResults[show.name] = seriesData;
        }

        currentShowIndex++;
    }

    // Stop the progress bar once completed
    progressBar.stop();

    fs.writeFileSync('result.json', JSON.stringify(allResults, null,  2), 'utf8');
}

main().catch(console.error);
