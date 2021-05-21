import request from 'superagent';

export async function signUp(credentials) {
  const response = await request.post('/api/auth/signup').send(credentials);

  return response.body;
}

export async function signIn(credentials) {
  const response = await request.post('/api/auth/signin').send(credentials);

  return response.body;
}

export async function getArtworks(search) {
  const response = await request
    .get('/api/artworks')
    .set('Authorization', window.localStorage.getItem('TOKEN'))
    .query({ search: search });

  return response.body;
}

export async function getArtwork(id) {
  const response = await request
    .get(`/api/artworks/${id}`)
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response.body;
}

export async function addFavorite(favorite) {
  const response = await request
    .post('/api/favorites')
    .set('Authorization', window.localStorage.getItem('TOKEN'))
    .send(favorite);

  return response;
}

export async function deleteFavorite(id) {
  const response = await request
    .delete(`/api/favorites/${id}`)
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response;
}

export async function getMyFavorites() {
  const response = await request
    .get('/api/me/favorites')
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response.body;
}

export async function isMyFavorite(objectID) {
  const response = await request
    .get(`/api/me/favorites/${objectID}`)
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response.body.length > 0;
}

export async function favoritesHandler(artwork, isFavorite, favorites) {
  try {
    if (isFavorite) {
      const response = await addFavorite(artwork);
      if (response.status !== 200) {
        throw new Error(response.body);
      }
      const favorite = response.body;
      // add artwork to favorites array
      favorites.splice(1, 0, favorite);
    } else {
      // find the artwork id to delete
      let index = 0;
      for (let i = 0; i < favorites.length; i++) {
        if (favorites[i].objectID === artwork.objectID) {
          index = i;
          break;
        }
      }
      const favoriteId = favorites[index].id;
      const response = await deleteFavorite(favoriteId);
      if (response.status !== 200) {
        throw new Error(response.body);
      }
      // delete the artwork from favorites array
      favorites.splice(index, 1);
    }
  } catch (err) {
    console.log(err.message);
  }
  return favorites;
}
