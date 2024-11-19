import { Container, Stack, Table } from "react-bootstrap"
import { useEffect, useState } from "react"
import { Button, FloatButton } from "antd"
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { PlusCircleFilled } from '@ant-design/icons';
import styles from "../../components/Crud/Crud.module.css"

const Crud = () => {

    //Estados para controlar modais

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);
    //

    // Estados para controlar os nomes atuais, na tela principal
    const [nome, setNome] = useState('')
    const [custo, setCusto] = useState('')
    const [venda, setVenda] = useState('')
    const [quantidade, setQuantidade] = useState('')
    const [isActive, setIsActive] = useState(0)
    //

    // Estados para controlar os nomes editados ou não no modal de edição
    const [editID, setEditId] = useState('')
    const [editNome, setEditNome] = useState('')
    const [editCusto, setEditCusto] = useState('')
    const [editVenda, setEditVenda] = useState('')
    const [editQuantidade, setEditQuantidade] = useState('')
    const [editIsActive, setEditIsActive] = useState(0)
    //


    const empdata = [ // Dados "martelados" no código apenas para ter uma amostra quando não tiver base de dados e ficar visível no vecel, por exemplo
        {
            id: 999,
            nome: "Galão de Água",
            custo: 14.99,
            venda: 21.99,
            quantidade: 10,
            isActive: 1
        },
        {
            id: 998,
            nome: "Copo descartável",
            custo: 5.99,
            venda: 10.99,
            quantidade: 50,
            isActive: 1
        }
    ]

    const [data, setData] = useState([]) // Estado para controlar os dados que vêm da base

    useEffect(() => {
        getData()
    }, [])

    const getData = () => { // GET geral
        axios.get("https://localhost:7284/api/ProdutoClass")
            .then((result) => {
                setData(result.data)
            })
            .catch((error => {
                console.log(error)
            }))
    }

    const handleEdit = (id) => { //GET de um id específico para abrir a tela de edição quando clicado em seu botão Editar
        handleShow()
        axios.get(`https://localhost:7284/api/ProdutoClass/${id}`)
            .then((result) => {
                setEditNome(result.data.nome)
                setEditCusto(result.data.custo)
                setEditVenda(result.data.venda)
                setEditQuantidade(result.data.quantidade)
                setEditIsActive(result.data.isActive)
                setEditId(id)
            })
            .catch((error => {
                console.log(error)
            }))
    }

    const handleDelete = (id) => { //DELETE de um id específico quando clicado em seu botão Deletar
        if (window.confirm("Tem certeza que quer deletar esse item?") === true) {
            axios.delete(`https://localhost:7284/api/ProdutoClass/${id}`)
                .then((result) => {
                    if (result.status === 200) {
                        toast.success("Produto Deletado com sucesso!")
                        getData()
                    }
                })
                .catch((error) => {
                    toast.error("Erro ao Deletar o produto! " + error)
                })
        }
    }

    const handleUpdate = () => { //PUT para editar o id específico anteriormente selecionado pelo GET{id}
        const url = `https://localhost:7284/api/ProdutoClass/${editID}`
        const data = {
            "id": editID,
            "nome": editNome,
            "custo": editCusto,
            "venda": editVenda,
            "quantidade": editQuantidade,
            "isActive": editIsActive
        }
        axios.put(url, data)
            .then((result) => {
                handleClose();
                getData();
                clear();
                toast.success("Produto Atualizado com sucesso!")
            }).catch((error) => {
                toast.error("Erro ao atualizar o produto! " + error)
            })
    }

    const handleSave = () => { //POST para adicionar um novo produto
        const url = 'https://localhost:7284/api/ProdutoClass'
        const data = {
            "nome": nome,
            "custo": custo,
            "venda": venda,
            "quantidade": quantidade,
            "isActive": isActive
        }
        axios.post(url, data)
            .then((result) => {
                getData();
                clear();
                toast.success("Produto adicionado com sucesso!")
            }).catch((error) => {
                toast.error("Erro ao adicionar o produto! " + error)
            })
    }

    const clear = () => { // função para limpar os dados após o envio
        setNome('')
        setCusto('')
        setVenda('')
        setQuantidade('')
        setIsActive(0)

        setEditNome('')
        setEditCusto('')
        setEditVenda('')
        setEditQuantidade('')
        setEditIsActive(0)
        setEditId('')
    }

    const handleActiveChange = (e) => { // função para verificar se está ativo a partir do check
        if (e.target.checked) {
            setIsActive(1);
        } else {
            setIsActive(0);
        }
    }

    const handleEditActiveChange = (e) => { // função para verificar se está ativo a partir do check porém na edição do PUT
        if (e.target.checked) {
            setEditIsActive(1);
        } else {
            setEditIsActive(0);
        }
    }

    return (
        <main>
            <ToastContainer />
            {/* Modal para abrir a janela de adicionar um produto novo */}
            <Modal show={showAdd} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar Novo Produto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Stack>
                            <Row>
                                <Col>
                                    <label htmlFor="nome">Nome do Produto:</label>
                                </Col>
                                <Col>
                                    <input name="nome" id="nome" type="text" className="form-control" placeholder="Digite o nome do produto"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label htmlFor="custo">Custo do produto:</label>
                                </Col>
                                <Col>
                                    <input name="custo" id="custo" type="number" className="form-control" placeholder="Digite o custo do produto"
                                        value={custo}
                                        onChange={(e) => setCusto(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label htmlFor="venda">Preço de venda do produto:</label>
                                </Col>
                                <Col>
                                    <input name="venda" id="venda" type="number" className="form-control" placeholder="Digite o preço do produto"
                                        value={venda}
                                        onChange={(e) => setVenda(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row >
                                <Col>
                                    <label htmlFor="quantidade">Quantidade do produto:</label>
                                </Col>
                                <Col>
                                    <input name="quantidade" id="quantidade" type="number" className="form-control" placeholder="Digite a quantidade do produto"
                                        value={quantidade}
                                        onChange={(e) => setQuantidade(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className={styles.active__box}>
                                        <input type="checkbox"
                                            value={isActive}
                                            checked={isActive === 1 ? true : false}
                                            onChange={(e) => handleActiveChange(e)}
                                        />
                                        <label>Está ativo?</label>
                                    </div>
                                </Col>
                            </Row>
                        </Stack>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="primary" onClick={() => handleSave()}>Adicionar</Button>
                </Modal.Footer>
            </Modal>
            {/* Tabela dos produtos adicionados */}
            <Table bordered striped>
                <thead>
                    <tr>
                        <th className={styles.table__line}>#</th>
                        <th>Nome do Produto</th>
                        <th className={styles.table__line}>Preço de Custo</th>
                        <th className={styles.table__line}>Preço de Venda</th>
                        <th className={styles.table__line}>Quantidade</th>
                        <th className={styles.table__line}>Ativo?</th>
                        <th className={styles.table__line}>Ações</th>
                    </tr>
                </thead>
                <tbody>

                    {/* Esses dois primeiros itens são apenas para ficar no display quando não estiver conectado com uma base de dados */}
                    {
                        empdata && empdata.length > 0 ?
                            empdata.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className={styles.table__line}>{index + 1}</td>
                                        <td>{item.nome}</td>
                                        <td className={styles.table__line}>{item.custo.toString().replace(".", ",")}</td>
                                        <td className={styles.table__line}>{item.venda.toString().replace(".", ",")}</td>
                                        <td className={styles.table__line}>{item.quantidade}</td>
                                        <td className={styles.table__line}>{item.isActive}</td>
                                        <th className={styles.table__line} colSpan={2}>
                                            <Button type="primary" onClick={() => handleEdit(item.id)}>Editar</Button> &nbsp;
                                            <Button type="primary" danger onClick={() => handleDelete(item.id)}>Deletar</Button>
                                        </th>
                                    </tr>
                                )
                            })
                            :
                            "Carregando..."
                    }

                    {/* Daqui em diante já começa toda operação de buscar o item na base de dados, mapear e renderizar a linha na tabela para cada item */}
                    {
                        data && data.length > 0 ?
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className={styles.table__line}>{index + 1}</td>
                                        <td>{item.nome}</td>
                                        <td className={styles.table__line}>{item.custo.toString().replace(".", ",")}</td>
                                        <td className={styles.table__line}>{item.venda.toString().replace(".", ",")}</td>
                                        <td className={styles.table__line}>{item.quantidade}</td>
                                        <td className={styles.table__line}>{item.isActive}</td>
                                        <th className={styles.table__line} colSpan={2}>
                                            <Button type="primary" onClick={() => handleEdit(item.id)}>Editar</Button> &nbsp;
                                            <Button type="primary" danger onClick={() => handleDelete(item.id)}>Deletar</Button>
                                        </th>
                                    </tr>
                                )
                            })
                            :
                            "Carregando..."
                    }
                </tbody>
            </Table>

            {/* Modal que é mostrado quando o usuário clica em Editar */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modificar ou Atualizar Produto</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Stack>
                        <Row>
                            <Col>
                                <label htmlFor="nomeEdit">Editar Nome do Produto:</label>
                                <input id="nomeEdit" type="text" className="form-control" placeholder="Digite o nome do produto"
                                    value={editNome}
                                    onChange={(e) => setEditNome(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <label htmlFor="custoEdit">Editar Custo do produto:</label>
                                <input id="custoEdit" type="number" className="form-control" placeholder="Digite o custo do produto"
                                    value={editCusto}
                                    onChange={(e) => setEditCusto(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <label htmlFor="vendaEdit">Editar Preço de venda do produto:</label>
                                <input id="vendaEdit" type="number" className="form-control" placeholder="Digite o preço do produto"
                                    value={editVenda}
                                    onChange={(e) => setEditVenda(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row >
                            <Col>
                                <label htmlFor="qtdEdit">Editar quantidade do produto:</label>
                                <input id="qtdEdit" type="number" className="form-control" placeholder="Digite a quantidade do produto"
                                    value={editQuantidade}
                                    onChange={(e) => setEditQuantidade(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className={styles.active__box}>
                                    <input type="checkbox"
                                        checked={editIsActive === 1 ? true : false}
                                        onChange={(e) => handleEditActiveChange(e)}
                                        value={editIsActive}
                                    />
                                    <label>Está ativo?</label>
                                </div>
                            </Col>
                        </Row>
                    </Stack>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="primary" onClick={handleUpdate}>Salvar</Button>
                </Modal.Footer>
            </Modal>

            {/* Botão flutuante que abre o modal de adicioar o produto */}
            <FloatButton icon={<PlusCircleFilled />} type="primary" style={{ insetInlineEnd: 24 }} onClick={handleShowAdd} />
        </main>
    )
}

export default Crud;