'use client';

import { use, useContext, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Edit, Trash2, Plus, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PaymentAccount } from "@/types";
import { addPaymentAccount, deletePaymentAccount, getAllPaymentAccounts, updatePaymentAccount } from "@/services/paymentAccountApi";
import { AppContext } from "@/providers/AppContextProvider";


interface PaymentManagementProps {
  onBack: () => void;
  selectedAccount?: string;
  setSelectedAccount?: (accountId: string) => void;
}

export function PaymentManagement({ onBack, selectedAccount, setSelectedAccount }: PaymentManagementProps) {
  const { toast } = useToast();
  const [accounts, setAccounts] = useState<PaymentAccount[]>([]);
  const { currentUser } = useContext(AppContext);
  
  const [deleteAccount, setDeleteAccount] = useState<PaymentAccount | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<PaymentAccount | null>(null);
  const [formData, setFormData] = useState<PaymentAccount>({
    bank_name: "",
    account_number: "",
    account_name: ""
  });

  useEffect(() => {
    if (!currentUser) return;
    // Fetch existing payment accounts on component mount
    const fetchAccounts = async () => {
      const existingAccounts = await getAllPaymentAccounts();
      setAccounts(existingAccounts);
    };
    fetchAccounts();
  }, [currentUser]);

  const handleDelete = (account: PaymentAccount) => {
    setDeleteAccount(account);
  };

  const confirmDelete = async () => {
    if (deleteAccount && deleteAccount._id) {
      await deletePaymentAccount(deleteAccount._id);
      setAccounts(accounts.filter(acc => acc._id !== deleteAccount._id));
      toast({
        title: "Account Deleted",
        description: "Payment account has been successfully removed."
      });
      setDeleteAccount(null);
    }
  };

  const handleAddNew = () => {
    setEditingAccount(null);
    setFormData({ bank_name: "", account_number: "", account_name: "" });
    setIsFormOpen(true);
  };

  const handleUpdate = (account: PaymentAccount) => {
    setEditingAccount(account);
    setFormData({
      bank_name: account.bank_name,
      account_number: account.account_number,
      account_name: account.account_name
    });
    setIsFormOpen(true);
  };

  const handleFormSubmit = async () => {
    if (!formData.bank_name || !formData.account_number || !formData.account_name) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    if (editingAccount && editingAccount._id) {
      // Update existing account
      const updatedAccount = await updatePaymentAccount(editingAccount?._id, formData);
      if (!updatedAccount) {
        toast({
          title: "Update Error",
          description: "Failed to update account. Please try again.",
          variant: "destructive"
        });
        return;
      }
      setAccounts(accounts.map(acc => 
        acc._id === editingAccount._id 
          ? { ...acc, ...updatedAccount }
          : acc
      ));
      toast({
        title: "Account Updated",
        description: "Payment account has been successfully updated."
      });
    } else {
      // Add new account
      const newAccount = await addPaymentAccount(formData);
      if (newAccount) {
        setAccounts([...accounts, newAccount]);
        toast({
          title: "Account Added",
          description: "Payment account has been successfully added."
        });
        setIsFormOpen(false);
        setEditingAccount(null);
        setFormData({ bank_name: "", account_number: "", account_name: "" });
      }
      toast({
        title: "Add Account Error",
        description: "Failed to add new account"
      })
      
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="mr-3"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-semibold">Payment Management</h1>
      </div>

      {/* Add New Account Button */}
      <Button className="w-full mb-4" variant="outline" onClick={handleAddNew}>
        <Plus size={16} className="mr-2" />
        Add New Account
      </Button>

      {/* Payment Accounts List */}
      <div className="space-y-3">
        {accounts.map((account) => (
          <Card 
          key={account._id} 
          className={`p-4 ${selectedAccount === account._id ? 'border-2 border-primary' : ''}`} 
          onClick={() => setSelectedAccount? setSelectedAccount(account._id? account._id: "") : null}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="mb-2">
                  <span className="text-xs text-muted-foreground">Bank Name</span>
                  <p className="font-medium">{account.bank_name}</p>
                </div>
                <div className="mb-2">
                  <span className="text-xs text-muted-foreground">Account Number</span>
                  <p className="font-medium">{account.account_number}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Account Name</span>
                  <p className="font-medium">{account.account_name}</p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2 ml-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleUpdate(account)}
                  className="h-8 w-8"
                >
                  <Edit size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(account)}
                  className="h-8 w-8 text-destructive hover:text-destructive"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {accounts.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No payment accounts added yet.</p>
          <p className="text-sm">Add your first account to get started.</p>
        </div>
      )}

      {/* Add/Edit Account Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingAccount ? "Edit Payment Account" : "Add New Payment Account"}
            </DialogTitle>
            <DialogDescription>
              {editingAccount ? "Update your payment account details below." : "Enter your payment account details below."}
            </DialogDescription>
          </DialogHeader>
          <div className="gr_id gap-4 py-4">
            <div className="gr_id gap-2">
              <Label htmlFor="bank_name">Bank Name</Label>
              <Input
                id="bank_name"
                value={formData.bank_name}
                onChange={(e) => setFormData({ ...formData, bank_name: e.target.value })}
                placeholder="Enter bank name"
              />
            </div>
            <div className="gr_id gap-2">
              <Label htmlFor="account_number">Account Number</Label>
              <Input
                id="account_number"
                value={formData.account_number}
                onChange={(e) => setFormData({ ...formData, account_number: e.target.value })}
                placeholder="Enter account number"
              />
            </div>
            <div className="gr_id gap-2">
              <Label htmlFor="account_name">Account Name</Label>
              <Input
                id="account_name"
                value={formData.account_name}
                onChange={(e) => setFormData({ ...formData, account_name: e.target.value })}
                placeholder="Enter account name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFormOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleFormSubmit}>
              {editingAccount ? "Update Account" : "Add Account"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteAccount} onOpenChange={() => setDeleteAccount(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Payment Account</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this payment account? This action cannot be undone.
              <br />
              <br />
              <strong>Bank:</strong> {deleteAccount?.bank_name}
              <br />
              <strong>Account:</strong> {deleteAccount?.account_number}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}