// styles
import styles from './Home.module.css';
//
import { useFirestore } from '../../components/hooks/useFirestore';

const TransactionList = ({ transactions }) => {
  const { deleteDocument } = useFirestore('transaction');
  return (
    <ul className={styles.transactions}>
      {transactions.map((transaction) => {
        return (
          <li key={transaction.id}>
            <p className={styles.name}>{transaction.name}</p>
            <p className={styles.amount}>${transaction.amount}</p>
            <button
              onClick={() => {
                deleteDocument(transaction.id);
              }}
            >
              X
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default TransactionList;
