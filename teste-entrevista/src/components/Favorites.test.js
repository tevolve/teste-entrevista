// src/components/Favorites.test.js

import { render, screen } from '@testing-library/react'; // Importação para renderizar o componente e acessar a tela
import Favorites from './Favorites';  // O componente que você está testando
import { AuthContext } from '../contexts/AuthContext'; // Ajuste para importar o AuthContext corretamente

test('deve exibir os favoritos corretamente quando o login estiver disponível', () => {
  const mockLogin = { username: 'testUser', token: '12345' };  // Definindo um login simulado

  // Envolva seu componente no contexto simulado
  render(
    <AuthContext.Provider value={{ login: mockLogin }}>
      <Favorites />
    </AuthContext.Provider>
  );

  // Verifique se o conteúdo esperado é exibido
  // Substitua com o texto real que você espera encontrar, por exemplo:
  expect(screen.getByText(/algum texto esperado/)).toBeInTheDocument();
});
