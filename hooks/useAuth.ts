import { useState, useEffect } from 'react';
import { AuthService, UserProfile } from '@/services/auth.service';
import { useApi, useMutation } from './useApi';
import { ApiResponse } from '@/types';

// Hook for user authentication
export function useAuth() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const {
    data: profileResponse,
    loadingState,
    error,
    refetch
  } = useApi(() => AuthService.getProfile());

  const profile = (profileResponse as any)?.data?.[0] || null;

  const loginMutation = useMutation(AuthService.login);
  const signupMutation = useMutation(AuthService.signup);
  const logoutMutation = useMutation(AuthService.logout);
  const updateProfileMutation = useMutation(async (data: any) => {
    const result = await AuthService.updateProfile(data);
    return { success: !!result, data: result || [], message: result ? "Success" : "Failed" };
  });

  useEffect(() => {
    if (profile) {
      setUser(profile);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [profile]);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      await loginMutation.mutate(credentials);
      await refetch(); // Refresh user profile
      return true;
    } catch (error) {
      return false;
    }
  };

  const signup = async (data: {
    Email: string;
    Password: string;
    FullName: string;
    Username: string;
  }) => {
    try {
      await signupMutation.mutate(data);
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = async () => {
    try {
      await logoutMutation.mutate({});
      setUser(null);
      setIsAuthenticated(false);
      return true;
    } catch (error) {
      return false;
    }
  };

  const updateProfile = async (data: { FullName?: string; ProfilePhoto?: string }) => {
    try {
      const result = await updateProfileMutation.mutate(data);
      if (result) {
        setUser(result as UserProfile);
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    user,
    isAuthenticated,
    loadingState,
    error,
    login,
    signup,
    logout,
    updateProfile,
    refetch
  };
}

// Hook for profile management
export function useProfile() {
  const {
    data: profile,
    loadingState,
    error,
    refetch
  } = useApi(() => AuthService.getProfile());

  const updateProfileMutation = useMutation(async (data: any) => {
    const result = await AuthService.updateProfile(data);
    return { success: !!result, data: result || [], message: result ? "Success" : "Failed" };
  });

  const updateProfile = async (data: { FullName?: string; ProfilePhoto?: string }) => {
    try {
      await updateProfileMutation.mutate(data);
      await refetch(); // Refresh profile
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    profile,
    loadingState,
    error,
    updateProfile,
    refetch
  };
}
