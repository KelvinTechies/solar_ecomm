// src/components/AccountForm.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAccount, updateAccount, setEditingAccount } from '../../../reducx/accountSlice';

const AccountForm = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const editingAccount = useSelector((state) => state.accounts.editingAccount);
    
    const [formData, setFormData] = useState({
        account_number: '',
        account_name: '',
        bank_name: ''
    });

    useEffect(() => {
        if (editingAccount) {
            setFormData({
                account_number: editingAccount.account_number,
                account_name: editingAccount.account_name,
                bank_name: editingAccount.bank_name
            });
        } else {
            setFormData({
                account_number: '',
                account_name: '',
                bank_name: ''
            });
        }
    }, [editingAccount]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            if (editingAccount) {
                // For update, only send account_name and bank_name
                const updateData = {
                    account_name: formData.account_name,
                    bank_name: formData.bank_name
                };
                
                await dispatch(updateAccount({
                    id: editingAccount.id,
                    accountData: updateData
                })).unwrap();
                
                dispatch(setEditingAccount(null));
            } else {
                await dispatch(addAccount(formData)).unwrap();
                
                setFormData({
                    account_number: '',
                    account_name: '',
                    bank_name: ''
                });
            }
        } catch (err) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">
                    {editingAccount ? 'Edit Account' : 'Create New Account'}
                </h5>
                
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Account Number</label>
                        <input
                            type="text"
                            className="form-control"
                            name="account_number"
                            value={formData.account_number}
                            onChange={handleChange}
                            disabled={!!editingAccount}
                            required={!editingAccount}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Account Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="account_name"
                            value={formData.account_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Bank Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="bank_name"
                            value={formData.bank_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="d-flex gap-2">
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : (editingAccount ? 'Update' : 'Create')} Account
                        </button>
                        
                        {editingAccount && (
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => dispatch(setEditingAccount(null))}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AccountForm;