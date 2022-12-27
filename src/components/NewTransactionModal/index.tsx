import Modal from 'react-modal';
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'

import closeImg from '../../assets/close.svg'
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import { FormEvent, useState, useContext} from 'react';
import { api } from '../../services/api';
import { useTransactions } from '../../hooks/useTransactions';


interface NewTransactionModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
}


export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {
   const {createTransaction} = useTransactions();

   const [type, setType] = useState('deposit')
   const [amount, setAmout] = useState(0)
   const [title, setTitle] = useState('')
   const [category, setCategory] = useState('')
  async function handleCreatNewTransaction(event: FormEvent){
    event.preventDefault();
    
   await createTransaction({
      title, 
      amount,
      category,
      type,
    })
    setTitle('');
    setAmout(0);
    setCategory('');
    setType('deposit');
    onRequestClose();
   }
   
   
  
  return(
        <Modal isOpen={isOpen}
             onRequestClose={onRequestClose}
             overlayClassName = "react-modal-overlay"
             className= "react-modal-content">

                <button
                  type="button" 
                  onClick={onRequestClose} 
                  className = "react-modal-close">

                  <img src={closeImg} alt="Fechar Modal" />
                </button>
                <Container onSubmit={handleCreatNewTransaction}>
                  <h2>Cadastrar Transação</h2>

                  <input
                    placeholder="Título"
                    value={title}
                    onChange={event =>setTitle(event.target.value)}
                  />

                  <input
                  type= "number"
                    placeholder="Valor"
                    value={amount}
                    onChange={event => setAmout(Number(event.target.value))}
                  />
                  
                  <TransactionTypeContainer>

                    <RadioBox
                        type="button"
                       
                        onClick={() => {setType('deposit'); }}
                        isActive = {type == 'deposit'}
                        activeColor = "green"
                    >
                        <img src={incomeImg} alt="entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox
                        type="button"
                        onClick={() => {setType('withdraw'); }}
                        isActive = {type == 'withdraw'}
                        activeColor = "red"
                    >
                        <img src={outcomeImg} alt="saída" />
                        <span>Saída</span>
                    </RadioBox>

                 
                  </TransactionTypeContainer>
                  <input
                    placeholder="Categoria"
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                  />

                  <button type="submit">
                    Cadastrar
                  </button>
                </Container>
            </Modal>
    )
}