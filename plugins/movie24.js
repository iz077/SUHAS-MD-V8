const { cmd } = require('../command');
const { SinhalaSub } = require('@sl-code-lords/movie-api');
const { PixaldrainDL } = require("pixaldrain-sinhalasub");

// Movie search command
cmd({
    pattern: "sinhalasub",
    desc: "Search for a movie and get details and download options.",
    category: "movie",
    react: "🍿",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const input = q.trim();
        if (!input) return reply("Pʟᴇᴀꜱᴇ Pʀᴏᴠɪᴅᴇ ᴀ Mᴏᴠɪᴇ Oʀ Tᴠ Sʜᴏᴡ Nᴀᴍᴇ Tᴏ Sᴇᴀʀᴄʜ.🔍");
        
        // Step 1: Search for the movie
        const result = await SinhalaSub.get_list.by_search(input);
        if (!result.status || result.results.length === 0) return reply("Nᴏ Rᴇꜱᴜʟᴛꜱ Fᴏᴜɴᴅ.😕");

        let message = "*🧚‍♂️SUHAS-MD Search Results:🧚‍♂️*\n\n";
        result.results.forEach((item, index) => {
            message += `${index + 1}. ${item.title}\nType: ${item.type}\nLink: ${item.link}\n\n\n> *© 𝙿𝚘𝚠𝚎𝚛𝚍 𝙱𝚢 🧚‍♂️⃝𝚂𝚄𝙷𝙰𝚂-𝙼𝙳 𝚅8 💕⃟*`;
        });

        // Step 2: Send the search results to the user
        const sentMsg = await conn.sendMessage(from, {
            image: { url: `https://i.ibb.co/02FQtBf/20241118-143715.jpg` },
            caption: message,  // Send the description as the caption
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
            }
        }, { quoted: mek });

        // Wait for the user to select a movie by number
        const movieSelectionListener = async (update) => {
            const message = update.messages[0];

            if (!message.message || !message.message.extendedTextMessage) return;

            const userReply = message.message.extendedTextMessage.text.trim();
            const selectedMovieIndex = parseInt(userReply) - 1;

            // Ensure the user has selected a valid movie index
            if (selectedMovieIndex < 0 || selectedMovieIndex >= result.results.length) {
                await conn.sendMessage(from, {
                    react: { text: '❌', key: mek.key }
                });
                return reply("❗Iɴᴠᴀʟɪᴅ Reᴘʟᴀʏ. Pʟᴇᴀꜱᴇ Rᴇᴘʟʏ ᴀ Vᴀʟɪᴅ Nᴜɴᴍʙᴇʀ Fʀᴏᴍ Tʜᴇ Sᴇᴀʀᴄʜ Rᴇꜱᴜʟᴛꜱ.❗");
            }

            const selectedMovie = result.results[selectedMovieIndex];
            const link = selectedMovie.link;

            // Step 3: Fetch movie details from the selected movie's link
            const movieDetails = await SinhalaSub.movie(link);
            if (!movieDetails || !movieDetails.status || !movieDetails.result) {
                return reply("❗Mᴏᴠɪᴇ Dᴇᴛᴀɪʟꜱ Nᴏᴛ Fᴏᴜɴᴅ.❗");
            }

            const movie = movieDetails.result;
            let movieMessage = `*${movie.title}*\n\n`;
            movieMessage += `📆 ʀᴇʟᴇᴀꜱᴇ ᴅᴀᴛᴇ: ${movie.release_date}\n`;
            movieMessage += `🗺 ᴄᴏᴜɴᴛʀʏ: ${movie.country}\n`;
            movieMessage += `⌛ ᴅᴜʀᴀᴛɪᴏɴ: ${movie.duration}\n`;

            // Handling genres properly
            const genres = Array.isArray(movie.genres) ? movie.genres.join(', ') : movie.genres;
            movieMessage += `🎭 ɢᴇɴʀᴇꜱ: ${genres}\n`;

            movieMessage += `🌟 ɪᴍᴅʙ ʀᴀᴛɪɴɢ: ${movie.IMDb_Rating}\n`;
            movieMessage += `🎬 ᴅɪʀᴇᴄᴛᴏʀ: ${movie.director.name}\n\n`;
            movieMessage += `*🔢 Rᴇᴘʟʏ Tʜᴇ Nᴜᴍʙᴇʀ Yᴏᴜ Wᴀɴᴛ💕*\n\n`;
            movieMessage += `*1. ➠ ꜱᴅ - 480p*\n`;
            movieMessage += `*2. ➠ ʜᴅ - 720p*\n`;
            movieMessage += `*3. ➠ ʜʜᴅ - 1080p*\n\n`;
            movieMessage += `> *© 𝙿𝚘𝚠𝚎𝚛𝚍 𝙱𝚢 🧚‍♂️⃝𝚂𝚄𝙷𝙰𝚂-𝙼𝙳 𝚅8 💕⃟*`;

            const imageUrl = movie.images && movie.images.length > 0 ? movie.images[0] : null;

            // Step 4: Send movie details with download options
            const movieDetailsMessage = await conn.sendMessage(from, {
                image: { url: imageUrl },
                caption: movieMessage,
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                }
            }, { quoted: mek });

            // Listen for the user's reply to select the download quality
            const qualityListener = async (update) => {
                const message = update.messages[0];

                if (!message.message || !message.message.extendedTextMessage) return;

                const userReply = message.message.extendedTextMessage.text.trim();

                // Ensure the user is responding to the right message
                if (message.message.extendedTextMessage.contextInfo.stanzaId === movieDetailsMessage.key.id) {
                    let quality;
                    switch (userReply) {
                        case '1':
                            quality = "ꜱᴅ - 480p";
                            break;
                        case '2':
                            quality = "ʜᴅ - 720p";
                            break;
                        case '3':
                            quality = "ʜʜᴅ - 1080p";
                            break;
                        default:
                            await conn.sendMessage(from, {
                                react: { text: '❌', key: mek.key }
                            });
                            return reply("❗ Iɴᴠᴀʟɪᴅ Nᴜᴍʙᴇʀ. Pʟᴇᴀꜱᴇ Reᴘʟʏ Tʜᴇ Vᴀʟɪᴅ Nᴜᴍʙᴇʀ 1, 2, ᴏʀ 3.");
                    }

                    try {
                        // Fetch the direct download link for the selected quality
                        const directLink = await PixaldrainDL(link, quality, "direct");
                        if (directLink) {
                            // Provide download option
                            await conn.sendMessage(from, {
                                document: {
                                    url: directLink
                                },
                                mimetype: 'video/mp4',
                                fileName: `${movie.title}.mp4`,
                                caption: `${movie.title}\n\n> *© 𝙿𝚘𝚠𝚎𝚛𝚍 𝙱𝚢 🧚‍♂️⃝𝚂𝚄𝙷𝙰𝚂-𝙼𝙳 𝚅8 💕⃟*`
                            }, { quoted: mek });

                            // React with success
                            await conn.sendMessage(from, {
                                react: { text: '✅', key: mek.key }
                            });
                        } else {
                            await conn.sendMessage(from, {
                                react: { text: '❌', key: mek.key }
                            });
                            return reply(`❗ Cᴏᴜʟᴅ Nᴏᴛ Fɪɴᴅ Tʜᴇ ${quality} Dᴏᴡɴʟᴏᴀᴅ Lɪɴᴋ. Pʟᴇᴀꜱᴇ Rᴇᴘʟʏ Tʜᴇ Aɴᴏᴛʜᴇʀ Qᴜᴀʟɪᴛʏ.❗`);
                        }
                    } catch (err) {
                        console.error('Error in PixaldrainDL function:', err);
                        await conn.sendMessage(from, {
                            react: { text: '❌', key: mek.key }
                        });
                        return reply("❗ Aɴ Eʀʀᴏʀ Oᴄᴄᴜʀʀᴇᴅ Wʜɪʟᴇ Pʀᴏᴄᴇꜱꜱɪɴɢ Yᴏᴜʀ Dᴏᴡɴʟᴏᴀᴅ Rᴇǫᴜᴇꜱᴛ.❗");
                    }
                }
            };

            // Register the quality listener for this movie
            conn.ev.on("messages.upsert", qualityListener);

            // Clean up the listener after 60 seconds to prevent memory leaks
            setTimeout(() => {
                conn.ev.off("messages.upsert", qualityListener);
            }, 60000);
        };

        // Register the movie selection listener
        conn.ev.on("messages.upsert", movieSelectionListener);

        // Clean up the listener after 60 seconds to prevent memory leaks
        setTimeout(() => {
            conn.ev.off("messages.upsert", movieSelectionListener);
        }, 60000);

    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        return reply(`❗ Error: ${e.message}`);
    }
});
        // Wait for the user to select a movie by number
        const movieSelectionListener = async (update) => {
            const message = update.messages[0];

            if (!message.message || !message.message.extendedTextMessage) return;

            const userReply = message.message.extendedTextMessage.text.trim();
            const selectedMovieIndex = parseInt(userReply) - 1;

            // Ensure the user has selected a valid movie index
            if (selectedMovieIndex < 0 || selectedMovieIndex >= result.results.length) {
                await conn.sendMessage(from, {
                    react: { text: '❌', key: mek.key }
                });
                return reply("❗ Invalid selection. Please choose a valid number from the search results.");
            }

            const selectedMovie = result.results[selectedMovieIndex];
            const link = selectedMovie.link;

            // Step 3: Fetch movie details from the selected movie's link
            const movieDetails = await SinhalaSub.movie(link);
            if (!movieDetails || !movieDetails.status || !movieDetails.result) {
                return reply("❗ Movie details not found.");
            }

            const movie = movieDetails.result;
            let movieMessage = `*${movie.title}*\n\n`;
            movieMessage += `📅 Rᴇʟᴇᴀꜱᴇ ᴅᴀᴛᴇ: ${movie.release_date}\n`;
            movieMessage += `🗺 Cᴏᴜɴᴛʀʏ: ${movie.country}\n`;
            movieMessage += `⏰ Dᴜʀᴀᴛɪᴏɴ: ${movie.duration}\n`;

            // Handling genres properly
            const genres = Array.isArray(movie.genres) ? movie.genres.join(', ') : movie.genres;
            movieMessage += `🎭 Gᴇɴʀᴇꜱ: ${genres}\n`;

            movieMessage += `⭐ Iᴍᴅʙ Rᴀᴛɪɴɢ: ${movie.IMDb_Rating}\n`;
            movieMessage += `🎬 Dɪʀᴇᴄᴛᴏʀ: ${movie.director.name}\n\n`;
            movieMessage += `🔢 𝗥𝗘𝗣𝗟𝗬 𝗧𝗛𝗘 𝗤𝗨𝗔𝗟𝗜𝗧𝗬 𝗕𝗘𝗟𝗢𝗪\n\n`;
            movieMessage += `*SD | SD 480p*\n`;
            movieMessage += `*HD | HD 720p*\n`;
            movieMessage += `*FHD | FHD 1080p*\n\n`;
            movieMessage += `> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴇɴᴇᴛʜ-xᴅ ᴛᴇᴄʜ®`;

            const imageUrl = movie.images && movie.images.length > 0 ? movie.images[0] : null;

            // Step 4: Send movie details with download options
            const movieDetailsMessage = await conn.sendMessage(from, {
                image: { url: imageUrl },
                caption: movieMessage,
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                }
            }, { quoted: mek });

            // Listen for the user's reply to select the download quality
            const qualityListener = async (update) => {
                const message = update.messages[0];

                if (!message.message || !message.message.extendedTextMessage) return;

                const userReply = message.message.extendedTextMessage.text.trim();

                // Ensure the user is responding to the right message
                if (message.message.extendedTextMessage.contextInfo.stanzaId === movieDetailsMessage.key.id) {
                    let quality;
                    switch (userReply) {
                        case 'SD':
                            quality = "SD 480p";
                            break;
                        case 'HD':
                            quality = "HD 720p";
                            break;
                        case 'FHD':
                            quality = "FHD 1080p";
                            break;
                        default:
                            await conn.sendMessage(from, {
                                react: { text: '❌', key: mek.key }
                            });
                            return reply("❗ Invalid option. Please select from 1, 2, or 3.");
                    }

                    try {
                        // Fetch the direct download link for the selected quality
                        const directLink = await PixaldrainDL(link, quality, "direct");
                        if (directLink) {
                            // Provide download option
                            await conn.sendMessage(from, {
                                document: {
                                    url: directLink
                                },
                                mimetype: 'video/mp4',
                                fileName: `${movie.title}.mp4`,
                                caption: `${movie.title}\n\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴇɴᴇᴛʜ-xᴅ ᴛᴇᴄʜ®`
                            }, { quoted: mek });

                            // React with success
                            await conn.sendMessage(from, {
                                react: { text: '✅', key: mek.key }
                            });
                        } else {
                            await conn.sendMessage(from, {
                                react: { text: '❌', key: mek.key }
                            });
                            return reply(`❗ Could not find the ${quality} download link. Please check the URL or try another quality.`);
                        }
                    } catch (err) {
                        console.error('Error in PixaldrainDL function:', err);
                        await conn.sendMessage(from, {
                            react: { text: '❌', key: mek.key }
                        });
                        return reply("❗ An error occurred while processing your download request.");
                    }
                }
            };

            // Register the quality listener for this movie
            conn.ev.on("messages.upsert", qualityListener);

            // Clean up the listener after 60 seconds to prevent memory leaks
            setTimeout(() => {
                conn.ev.off("messages.upsert", qualityListener);
            }, 60000);
        };

        // Register the movie selection listener
        conn.ev.on("messages.upsert", movieSelectionListener);

        // Clean up the listener after 60 seconds to prevent memory leaks
        setTimeout(() => {
            conn.ev.off("messages.upsert", movieSelectionListener);
        }, 60000);

    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        return reply(`❗ Error: ${e.message}`);
    }
});
