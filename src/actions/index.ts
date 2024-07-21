'use server';

import * as auth from '@/auth';

const signIn = async () => auth.signIn('github');
const signOut = async () => auth.signOut();
