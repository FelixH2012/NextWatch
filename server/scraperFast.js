const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

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
        }

        console.log(`VOE Link found on ${url}: ${voeLink || 'Not found'}`);
        return voeLink;
    } catch (error) {
        if (error.response && error.response.status ===  400) {
            console.warn(`Bad Request beim Scrapen der Seite ${url}, Überspringe diese Seite.`);
            return null;
        } else {
            console.error(`Fehler beim Scrapen der Seite ${url}:`, error);
        }
    }
}

async function main() {
    const shows = await getShows();
    let result = [];

    for (const show of shows) {
        for (let season =  1; season <=  30; season++) {
            let promises = [];
            for (let episode =  1; episode <=  30; episode++) {
                const episodeUrl = `http://186.2.175.5/serie/stream/${encodeURIComponent(show.name)}/staffel-${season}/episode-${episode}`;
                console.debug(`Scrape Episode URL: ${episodeUrl}`);
                promises.push(scrapePage(episodeUrl));
            }

            const voeLinks = await Promise.all(promises);
            voeLinks.forEach((voeLink, index) => {
                if (voeLink) {
                    result.push({
                        seriesName: show.name,
                        seasonNumber: season,
                        episodeNumber: index +  1,
                        voeLink: voeLink
                    });
                }
            });

            if (voeLinks.some(link => !link)) {
                break;
            }
        }
    }

    fs.writeFileSync('results.json', JSON.stringify(result, null,  2), 'utf8');
}

main().catch(console.error);
