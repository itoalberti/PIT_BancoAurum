import { Button, Col, Form, Row } from 'react-bootstrap';
import ReactInputMask from 'react-input-mask';
import { useState } from 'react';

export default function FormCadUsuario(props) {
  // Define o estado do formulário e do usuário
  const [validado, setValidado] = useState(true);
  const [validaSenhaConfirmada, setValidaSenhaConfirmada] = useState(true);
  const [usuario, setUsuario] = useState(props.usuario);
  const [senha_confirmada, setSenhaConfirmada] = useState(props.usuario.senha);

  // Função para manipular qualquer mudança de valores nos campos do formulário
  function manipularMudanca(evento) {
    const componente = evento.currentTarget;
    if (componente.name === 'agencia') setUsuario({ ...usuario, agencia: { codigo: componente.value } });
    else if (componente.name === 'senha_confirmada') setSenhaConfirmada(componente.value);
    else setUsuario({ ...usuario, [componente.name]: componente.value });
  }

  // Função para enviar os dados do formulário para gravação/alteração caso estejam válidos
  function manipularSubmissao(evento) {
    evento.preventDefault();
    evento.stopPropagation();
    const form = evento.currentTarget;
    if (senha_confirmada !== usuario.senha) setValidaSenhaConfirmada(false);
    else if (!form.checkValidity()) setValidado(false);
    else {
      setValidado(true);
      setValidaSenhaConfirmada(true);
      if (!props.atualizando) props.gravarUsuario(usuario);
      else props.alterarUsuario(usuario);
    }
  }

  // Retorna o formulário de cadastro de usuário e seus atributos para ser preenchido
  return (
    <Form noValidate validated={!validado && !validaSenhaConfirmada} onSubmit={manipularSubmissao}>
      <Row className='mb-3'>
        {/* Código do Usuário */}
        <Col xs='auto' style={{ width: '100px' }}>
          <Form.Group>
            <Form.Label>Código</Form.Label>
            <Form.Control disabled type='number' placeholder='0' value={usuario.codigo} id='codigo' name='codigo' onChange={manipularMudanca} />
          </Form.Group>
        </Col>
      </Row>
      <Row className='mb-3'>
        {/* Tipo do Usuário */}
        <Col xs='auto' style={{ width: '200px' }}>
          <Form.Group>
            <Form.Label>Tipo</Form.Label>
            <Form.Select required value={usuario.tipo} id='tipo' name='tipo' onChange={manipularMudanca}>
              <option key={0} value={''}>
                Selecione o tipo
              </option>
              <option disabled style={{ backgroundColor: '#d3d3d3', color: 'white' }} key={1} value={'Administrador'}>
                Administrador
              </option>
              <option key={2} value={'Cliente'}>
                Cliente
              </option>
              <option key={3} value={'Funcionário'}>
                Funcionário
              </option>
              <option key={4} value={'Gerente'}>
                Gerente
              </option>
            </Form.Select>
            <Form.Control.Feedback type='invalid'>Por favor, informe o tipo!</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      {!props.atualizando && (
        <Row className='mb-3'>
          {/* Nome do Usuário */}
          <Col xs='auto' style={{ width: '340px' }}>
            <Form.Group>
              <Form.Label>Nome</Form.Label>
              <Form.Control required type='text' placeholder='Nome Completo' value={usuario.nome} id='nome' name='nome' onChange={manipularMudanca} />
              <Form.Control.Feedback type='invalid'>Por favor, informe o nome!</Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* Data de Nascimento do Usuário */}
          <Col xs='auto'>
            <Form.Group>
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control required type='date' placeholder='Data de Nascimento' value={usuario.data_nascimento} id='data_nascimento' name='data_nascimento' onChange={manipularMudanca} max={new Date(Date.now()).toISOString().split('T')[0]} />
              <Form.Control.Feedback type='invalid'>Por favor, informe a data de nascimento!</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      )}
      {!props.atualizando && (
        <Row className='mb-3'>
          {/* Gênero do Usuário */}
          <Col xs='auto'>
            <Form.Group>
              <Form.Label>Gênero</Form.Label>
              <Form.Select required value={usuario.genero} id='genero' name='genero' onChange={manipularMudanca}>
                <option key={0} value={''}>
                  Selecione o gênero
                </option>
                <option key={1} value={'Masculino'}>
                  Masculino
                </option>
                <option key={2} value={'Feminino'}>
                  Feminino
                </option>
              </Form.Select>
              <Form.Control.Feedback type='invalid'>Por favor, informe o gênero!</Form.Control.Feedback>
            </Form.Group>
          </Col>
          {/* CPF do Usuário */}
          <Col xs='auto' style={{ width: '160px' }}>
            <Form.Group>
              <Form.Label>CPF</Form.Label>
              {/* <Form.Control required type='text' placeholder='CPF' value={usuario.cpf} id='cpf' name='cpf' onChange={manipularMudanca} /> */}
              <ReactInputMask mask='999.999.999-99' placeholder='___.___.___-__' value={usuario.cpf} onChange={manipularMudanca}>
                {(inputProps) => <Form.Control {...inputProps} required type='text' name='cpf' id='cpf' />}
              </ReactInputMask>
              <Form.Control.Feedback type='invalid'>Por favor, informe o CPF!</Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* RG do Usuário */}
          <Col xs='auto' style={{ width: '145px' }}>
            <Form.Group>
              <Form.Label>RG</Form.Label>
              {/* <Form.Control required type='text' placeholder='RG' value={usuario.rg} id='rg' name='rg' onChange={manipularMudanca} /> */}
              <ReactInputMask mask='99.999.999-9' placeholder='__.___.___-_' value={usuario.rg} onChange={manipularMudanca}>
                {(inputProps) => <Form.Control {...inputProps} required type='text' name='rg' id='rg' />}
              </ReactInputMask>
              <Form.Control.Feedback type='invalid'>Por favor, informe o RG!</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      )}
      <Row className='mb-3'>
        {/* Telefone do Usuário */}
        <Col xs='auto' style={{ width: '165px' }}>
          <Form.Group>
            <Form.Label>Telefone</Form.Label>
            {/* <Form.Control required type='text' placeholder='Telefone' value={usuario.telefone} id='telefone' name='telefone' onChange={manipularMudanca} /> */}
            <ReactInputMask mask='(99) 99999-9999' placeholder='(__) _____-____' value={usuario.telefone} onChange={manipularMudanca}>
              {(inputProps) => <Form.Control {...inputProps} required type='text' name='telefone' id='telefone' />}
            </ReactInputMask>
            <Form.Control.Feedback type='invalid'>Por favor, informe o telefone!</Form.Control.Feedback>
          </Form.Group>
        </Col>

        {/* Agência do Usuário */}
        <Col xs='auto' style={{ width: '260px' }}>
          <Form.Group>
            <Form.Label>Agência</Form.Label>
            <Form.Select required value={usuario.agencia.codigo} id='agencia' name='agencia' onChange={manipularMudanca}>
              {props.listaAgencias[0].codigo !== '' ? (
                <>
                  <option key={0} value={''}>
                    Selecione uma agência
                  </option>
                  {props.listaAgencias.map((agencia) => {
                    return (
                      <option key={agencia.codigo} value={agencia.codigo}>
                        ({agencia.numero}) - {agencia.cidade}
                      </option>
                    );
                  })}
                </>
              ) : (
                <option key={0} value={''}>
                  {props.listaAgencias[0].endereco}
                </option>
              )}
            </Form.Select>
            <Form.Control.Feedback type='invalid'>Por favor, informe a agência!</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row className='mb-3'>
        {/* CEP do Usuário */}
        <Col xs='auto' style={{ width: '125px' }}>
          <Form.Group>
            <Form.Label>CEP</Form.Label>
            {/* <Form.Control required type='text' placeholder='CEP' value={usuario.cep} id='cep' name='cep' onChange={manipularMudanca} /> */}
            <ReactInputMask mask='99999-999' placeholder='_____-___' value={usuario.cep} onChange={manipularMudanca}>
              {(inputProps) => <Form.Control {...inputProps} required type='text' name='cep' id='cep' />}
            </ReactInputMask>
            <Form.Control.Feedback type='invalid'>Por favor, informe o CEP!</Form.Control.Feedback>
          </Form.Group>
        </Col>

        {/* Endereço do Usuário */}
        <Col xs='auto' style={{ width: '300px' }}>
          <Form.Group>
            <Form.Label>Endereço</Form.Label>
            <Form.Control required type='text' placeholder='Endereço' value={usuario.endereco} id='endereco' name='endereco' onChange={manipularMudanca} />
            <Form.Control.Feedback type='invalid'>Por favor, informe o endereço!</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row className='mb-3'>
        {/* Cidade do Usuário */}
        <Col xs='auto' style={{ width: '250px' }}>
          <Form.Group>
            <Form.Label>Cidade</Form.Label>
            <Form.Control required type='text' placeholder='Cidade' value={usuario.cidade} id='cidade' name='cidade' onChange={manipularMudanca} />
            <Form.Control.Feedback type='invalid'>Por favor, informe a cidade!</Form.Control.Feedback>
          </Form.Group>
        </Col>

        {/* UF do Usuário */}
        <Col xs='auto' style={{ width: '100px' }}>
          <Form.Group>
            <Form.Label>UF</Form.Label>
            {/* <Form.Control required type='text' placeholder='UF' value={usuario.uf} id='uf' name='uf' onChange={manipularMudanca} /> */}
            <Form.Select required id='uf' name='uf' value={usuario.uf} onChange={manipularMudanca}>
              <option></option>
              <option value='AC'>AC</option>
              <option value='AL'>AL</option>
              <option value='AP'>AP</option>
              <option value='AM'>AM</option>
              <option value='BA'>BA</option>
              <option value='CE'>CE</option>
              <option value='ES'>ES</option>
              <option value='GO'>GO</option>
              <option value='MA'>MA</option>
              <option value='MT'>MT</option>
              <option value='MS'>MS</option>
              <option value='MG'>MG</option>
              <option value='PA'>PA</option>
              <option value='PB'>PB</option>
              <option value='PR'>PR</option>
              <option value='PE'>PE</option>
              <option value='PI'>PI</option>
              <option value='RJ'>RJ</option>
              <option value='RN'>RN</option>
              <option value='RS'>RS</option>
              <option value='RO'>RO</option>
              <option value='RR'>RR</option>
              <option value='SC'>SC</option>
              <option value='SP'>SP</option>
              <option value='SE'>SE</option>
              <option value='TO'>TO</option>
              <option value='DF'>DF</option>
            </Form.Select>
            <Form.Control.Feedback type='invalid'>Por favor, informe o estado!</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row className='mb-3'>
        {/* E-mail do Usuário */}
        <Col xs='auto' style={{ width: '250px' }}>
          <Form.Group>
            <Form.Label>E-mail</Form.Label>
            <Form.Control required type='email' placeholder='E-mail' value={usuario.email} id='email' name='email' onChange={manipularMudanca} />
            <Form.Control.Feedback type='invalid'>Por favor, informe o e-mail!</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row className='mb-3'>
        {/* Senha do Usuário */}
        <Col xs='auto' style={{ width: '180px' }}>
          <Form.Group>
            <Form.Label>Senha</Form.Label>
            <Form.Control required type='password' placeholder='Senha' value={usuario.senha} id='senha' name='senha' onChange={manipularMudanca} />
            <Form.Control.Feedback type='invalid'>Por favor, informe a senha!</Form.Control.Feedback>
          </Form.Group>
        </Col>
        {/* Confirmação da Senha do Usuário */}
        <Col xs='auto' style={{ width: '180px' }}>
          <Form.Group>
            <Form.Label>Confirmar Senha</Form.Label>
            <Form.Control required placeholder='Confirmar Senha' type='password' value={senha_confirmada} id='senha_confirmada' name='senha_confirmada' onChange={manipularMudanca} isInvalid={!validaSenhaConfirmada} />
            {senha_confirmada === '' ? (
              <Form.Control.Feedback type='invalid'>Por favor, informe novamente a senha!</Form.Control.Feedback>
            ) : (
              senha_confirmada !== usuario.senha && <Form.Control.Feedback type='invalid'>As senhas não conferem!</Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>
      </Row>
      {/* Botões para Gravar/Alterar e Voltar para a lista de usuários */}
      <Button style={{ marginRight: '5px', marginBottom: '20px' }} type='submit'>
        {props.atualizando ? 'Atualizar' : 'Gravar'}
      </Button>
      <Button
        style={{ marginBottom: '20px' }}
        onClick={() => {
          if (props.atualizando) props.setAtualizando(false);
          props.setExibirTabela(true);
          props.setUsuarioAtual(props.usuarioVazio);
        }}
      >
        Voltar
      </Button>
    </Form>
  );
}
