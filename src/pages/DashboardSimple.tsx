import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DashboardSimple = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    console.log('DashboardSimple loading...');
    const userData = localStorage.getItem('enhpix_user');
    
    if (!userData) {
      console.log('No user data, redirecting to login');
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      console.log('User loaded:', parsedUser);
      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    }
  }, [navigate]);

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="p-6 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Enhpix Dashboard</h1>
          <Button onClick={() => {
            localStorage.removeItem('enhpix_user');
            navigate('/');
          }}>
            Logout
          </Button>
        </div>
      </header>
      
      <div className="p-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Welcome {user.email}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300">Plan: {user.plan}</p>
            <p className="text-slate-300">This is a simplified dashboard to test functionality.</p>
            <Button onClick={() => navigate('/dashboard-full')} className="mt-4">
              Go to Full Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardSimple;