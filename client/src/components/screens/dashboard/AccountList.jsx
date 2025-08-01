import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccounts, deleteAccount, setEditingAccount } from '../../../reducx/accountSlice';
import UpdateAccount from './UpdateAccount';

const AccountList = () => {
    const dispatch = useDispatch();
    const { items: accounts, status, error } = useSelector(state => state.accounts);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAccounts());
        }
    }, [status, dispatch]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this account?')) {
            await dispatch(deleteAccount(id));
        }
    };

    if (status === 'loading') {
        return <div className="text-center mt-5">Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Account Management</h2>
            
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            <UpdateAccount />

            <div className="mt-4">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Account Number</th>
                            <th>Account Name</th>
                            <th>Bank Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts && accounts.map(account => (
                            <tr key={account.id}>
                                <td>{account.account_number}</td>
                                <td>{account.account_name}</td>
                                <td>{account.bank_name}</td>
                                <td>
                                    <button 
                                        className="btn btn-sm btn-primary me-2"
                                        onClick={() => dispatch(setEditingAccount(account))}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(account.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AccountList;