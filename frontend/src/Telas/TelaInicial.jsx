import Pagina from '../Templates/Pagina'; // Importa o componente Pagina
import bankicon from '../IconeBanco/bankicon.png'; // Importa o ícone do banco

export default function TelaInicial(props) {
  // Renderiza o componente Pagina da tela inicial da aplicação
  return (
    <>
      <Pagina />
      <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
        <img src={bankicon} alt='Ícone do Banco' style={{ width: '25%', height: 'auto' }} />
      </div>
    </>
  );
}
