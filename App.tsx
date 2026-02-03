import React, { useState, useEffect } from 'react';
import { ScreenName, UserProfile } from './types';
import { BottomNav } from './components/BottomNav';

// Screens
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import OnboardingName from './screens/onboarding/OnboardingName';
import OnboardingGoal from './screens/onboarding/OnboardingGoal';
import OnboardingBirth from './screens/onboarding/OnboardingBirth';
import OnboardingBio from './screens/onboarding/OnboardingBio';
import HomeScreen from './screens/HomeScreen';
import ExploreScreen from './screens/ExploreScreen';
import NutritionScreen from './screens/NutritionScreen';
import WorkoutTimerScreen from './screens/WorkoutTimerScreen';
import WorkoutResultScreen from './screens/WorkoutResultScreen';
import ProfileScreen from './screens/ProfileScreen';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('welcome');
  const [darkMode, setDarkMode] = useState(false);

  // Global User State
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    gender: 'Masculino',
    goal: 'stay_healthy',
    birthDate: new Date(1998, 5, 28), // Default June 28, 1998
    weight: 75,
    height: 175,
    photoUrl: undefined
  });

  const updateUser = (data: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...data }));
  };

  // Toggle Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const navigate = (screen: ScreenName) => {
    window.scrollTo(0, 0);
    setCurrentScreen(screen);
  };

  // Helper to determine if we show the bottom nav
  const showBottomNav = ['home', 'explore', 'nutrition', 'profile'].includes(currentScreen);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome': return <WelcomeScreen onNavigate={navigate} />;
      case 'login': return <LoginScreen onNavigate={navigate} />;
      case 'register': return <RegisterScreen onNavigate={navigate} />;
      
      // Onboarding Flow
      case 'onboarding_name': return <OnboardingName onNavigate={navigate} user={userProfile} updateUser={updateUser} />;
      case 'onboarding_goal': return <OnboardingGoal onNavigate={navigate} user={userProfile} updateUser={updateUser} />;
      case 'onboarding_birth': return <OnboardingBirth onNavigate={navigate} user={userProfile} updateUser={updateUser} />;
      case 'onboarding_bio': return <OnboardingBio onNavigate={navigate} user={userProfile} updateUser={updateUser} />;
      
      // Main App
      case 'home': return <HomeScreen onNavigate={navigate} user={userProfile} />;
      case 'explore': return <ExploreScreen onNavigate={navigate} />;
      case 'nutrition': return <NutritionScreen onNavigate={navigate} />;
      case 'profile': return <ProfileScreen onNavigate={navigate} user={userProfile} updateUser={updateUser} isDarkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />;
      
      // Workouts
      case 'workout_timer': return <WorkoutTimerScreen onNavigate={navigate} />;
      case 'workout_result': return <WorkoutResultScreen onNavigate={navigate} />;
      
      default: return <WelcomeScreen onNavigate={navigate} />;
    }
  };

  return (
    <div className={`min-h-screen w-full flex justify-center bg-gray-100 dark:bg-black font-sans`}>
      <div className="w-full max-w-md bg-background-light dark:bg-background-dark min-h-screen relative shadow-2xl overflow-hidden">
        {renderScreen()}
        {showBottomNav && <BottomNav currentScreen={currentScreen} onNavigate={navigate} />}
      </div>
    </div>
  );
};

export default App;