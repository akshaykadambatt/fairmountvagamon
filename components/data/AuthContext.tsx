import React from 'react';
import firebase from 'firebase/compat';

export const AuthContext = React.createContext<firebase.User | null>(null);