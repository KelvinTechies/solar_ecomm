import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAccount, updateAccount, setEditingAccount, clearError } from '../../../reducx/accountSlice';

const UpdateAccount = () => {
    const dispatch = useDispatch();
    const { editingAccount, error } = useSelector(state => state.accounts);
    const [loading, setLoading] = useState(false);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) dispatch(clearError());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            if (editingAccount) {
                console.log('Sending data:', formData);
                // Send just the formData directly
                await dispatch(updateAccount({
                    id: editingAccount.id,
                    accountData: {
                        bank_name: formData.bank_name,
                        account_name: formData.account_name,
                        account_number: formData.account_number
                    }
                })).unwrap();
            } 
        } catch (err) {
            console.error('Failed to save account:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        dispatch(setEditingAccount(null));
        dispatch(clearError());
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
                            // disabled={!!editingAccount}
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
                                onClick={handleCancel}
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

export default UpdateAccount;