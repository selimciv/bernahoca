// Utility to log game activities
// Import this in game components and call when game starts/ends

export const logGameActivity = (gameName: string, levelOrMode: string, duration?: number) => {
    const activities = sessionStorage.getItem('bernahoca_activities');
    const activitiesArray = activities ? JSON.parse(activities) : [];

    // Map level strings to display names
    let displayLevel = levelOrMode;
    if (levelOrMode.startsWith('Grade9_') || levelOrMode === 'grade9') {
        displayLevel = '9. Sınıf';
    } else if (levelOrMode.startsWith('YDT_') || levelOrMode === 'ydt') {
        displayLevel = '11. Sınıf (YDT)';
    } else if (levelOrMode.startsWith('A') || levelOrMode.startsWith('B') || levelOrMode.startsWith('C') || levelOrMode === 'standard') {
        displayLevel = 'Genel';
    }

    const fullGameName = `${displayLevel} - ${gameName}`;

    // Check if this EXACT game was already logged in this session (within last 2 seconds)
    const alreadyLogged = activitiesArray.some((act: any) =>
        act.type === 'game_played' &&
        act.details === fullGameName &&
        (Date.now() - act.timestamp) < 2000
    );

    if (alreadyLogged) {
        console.log(`Skipping duplicate log for: ${fullGameName}`);
        return;
    }

    const timestamp = Date.now();
    activitiesArray.push({
        type: 'game_played',
        timestamp,
        details: fullGameName,
        duration: duration || 0,
    });

    sessionStorage.setItem('bernahoca_activities', JSON.stringify(activitiesArray));
    // Store start time for this game
    sessionStorage.setItem(`game_start_${fullGameName}`, timestamp.toString());
    console.log(`Game activity logged: ${fullGameName}`, duration ? `${duration}ms` : '');
};

// Update duration when game ends (called on unmount)
export const updateGameDuration = (gameName: string, levelOrMode: string) => {
    // Map level strings to display names
    let displayLevel = levelOrMode;
    if (levelOrMode.startsWith('Grade9_') || levelOrMode === 'grade9') {
        displayLevel = '9. Sınıf';
    } else if (levelOrMode.startsWith('YDT_') || levelOrMode === 'ydt') {
        displayLevel = '11. Sınıf (YDT)';
    } else if (levelOrMode.startsWith('A') || levelOrMode.startsWith('B') || levelOrMode.startsWith('C') || levelOrMode === 'standard') {
        displayLevel = 'Genel';
    }

    const fullGameName = `${displayLevel} - ${gameName}`;
    const startTimeStr = sessionStorage.getItem(`game_start_${fullGameName}`);

    if (!startTimeStr) return;

    const startTime = parseInt(startTimeStr);
    const duration = Date.now() - startTime;

    // Update the activity duration
    const activities = sessionStorage.getItem('bernahoca_activities');
    if (activities) {
        const activitiesArray = JSON.parse(activities);
        const gameActivity = activitiesArray.find((act: any) =>
            act.type === 'game_played' &&
            act.details === fullGameName &&
            act.timestamp === startTime
        );

        if (gameActivity) {
            gameActivity.duration = duration;
            sessionStorage.setItem('bernahoca_activities', JSON.stringify(activitiesArray));
            console.log(`Updated game duration for ${fullGameName}: ${Math.floor(duration / 1000)}s`);
        }
    }

    // Clean up
    sessionStorage.removeItem(`game_start_${fullGameName}`);
};

// Update ALL game durations before exit (called from TelegramTracker)
export const updateAllGameDurations = () => {
    // Get all game_start_ keys from sessionStorage
    const keys = Object.keys(sessionStorage);
    const gameStartKeys = keys.filter(key => key.startsWith('game_start_'));

    gameStartKeys.forEach(key => {
        const gameName = key.replace('game_start_', '');
        const startTimeStr = sessionStorage.getItem(key);

        if (!startTimeStr) return;

        const startTime = parseInt(startTimeStr);
        const duration = Date.now() - startTime;

        // Update the activity duration
        const activities = sessionStorage.getItem('bernahoca_activities');
        if (activities) {
            const activitiesArray = JSON.parse(activities);
            const gameActivity = activitiesArray.find((act: any) =>
                act.type === 'game_played' &&
                act.details === gameName &&
                act.timestamp === startTime
            );

            if (gameActivity) {
                gameActivity.duration = duration;
                sessionStorage.setItem('bernahoca_activities', JSON.stringify(activitiesArray));
                console.log(`Updated duration for ${gameName}: ${Math.floor(duration / 1000)}s`);
            }
        }

        // Clean up
        sessionStorage.removeItem(key);
    });
};
