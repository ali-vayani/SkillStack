import React from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_APP } from '../../../firebase.config';

export default function FirebaseLogin({ onClose }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors
        
        try {
        const auth = getAuth(FIREBASE_APP);
        await signInWithEmailAndPassword(auth, email, password);
        console.log("logged in");
        onClose?.(); // Close only on successful login
        } catch (error) {
        // Handle specific error cases
        switch (error.code) {
            case 'auth/invalid-email':
            setError('Invalid email address.');
            break;
            case 'auth/user-not-found':
            setError('No account found with this email.');
            break;
            case 'auth/wrong-password':
            setError('Incorrect password.');
            break;
            default:
            setError('Failed to log in. Please try again.');
        }
        }
    };

    return (
        // <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        
        <form onSubmit={handleSubmit} className="space-y-4 p-6 w-full relative">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Login</h2>
            </div>
            {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative">
                {error}
            </div>
            )}
            <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
            />
            </div>
            <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
            />
            </div>
            <Button type="submit" className="w-full">
            Submit
            </Button>
        </form>
  );
}