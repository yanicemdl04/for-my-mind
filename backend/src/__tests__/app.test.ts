import request from 'supertest';
import app from '../app';

describe('API Routes', () => {
  // Test de la route de base
  describe('GET /', () => {
    it('devrait retourner un message de bienvenue', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toEqual('Bienvenue sur l\'API MyMind');
    });
  });

  // Test de la route de santé
  describe('GET /health', () => {
    it('devrait retourner un statut ok', async () => {
      const res = await request(app).get('/health');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('status');
      expect(res.body.status).toEqual('ok');
    });
  });

  // Test d'une route inexistante
  describe('GET /route-inexistante', () => {
    it('devrait retourner une erreur 404', async () => {
      const res = await request(app).get('/route-inexistante');
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message');
    });
  });
});