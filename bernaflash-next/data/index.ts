// Re-export vocabulary data from legacy JavaScript files
// These files are copied as-is from the original project
// TODO: Convert to TypeScript format in future iterations

// @ts-ignore - Legacy JavaScript file
import { gameData as standardGameData } from './vocabulary-data.js';
// @ts-ignore - Legacy JavaScript file  
import { ydtGameData } from './ydt-vocabulary-data.js';

export { standardGameData, ydtGameData };
