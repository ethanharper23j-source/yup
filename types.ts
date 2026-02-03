export type ScreenName = 
  | 'welcome'
  | 'login'
  | 'register'
  | 'onboarding_name'
  | 'onboarding_goal'
  | 'onboarding_birth'
  | 'onboarding_bio'
  | 'home'
  | 'explore'
  | 'nutrition'
  | 'workout_timer'
  | 'workout_result'
  | 'profile';

export interface UserProfile {
  name: string;
  gender: string;
  goal: string;
  birthDate: Date;
  weight: number;
  height: number;
  photoUrl?: string;
}

export interface UserStats {
  weight: number;
  height: number;
  age: number;
  streak: number;
}