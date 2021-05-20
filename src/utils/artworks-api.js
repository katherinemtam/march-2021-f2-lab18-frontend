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

  return response.body;
}

export async function getMyFavorites() {
  const response = await request
    .get('/api/me/favorites')
    .set('Authorization', window.localStorage.getItem('TOKEN'));
  return response.body;
}
