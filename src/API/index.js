// APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/2407-FTB-ET-WEB-PT/players`;

/**
 * Fetches all players from the API and returns them.
 * @returns {Array} An array of player objects.
 */
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(APIURL);
    const json = await response.json();
    return json.data.players;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
    return [];
  }
};

export default fetchAllPlayers;