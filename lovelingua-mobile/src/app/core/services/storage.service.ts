import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { UserProfile } from '../models/user-profile.model';
import { TestResult } from '../models/test-result.model';
import { UserProgress } from '../models/user-progress.model';

@Injectable()
export class StorageService {
  private readonly PROFILE_KEY = 'user_profile';
  private readonly RESULTS_KEY = 'local_test_results';
  private readonly PROGRESS_KEY = 'user_progress';

  async saveProfile(profile: UserProfile): Promise<void> {
    await Preferences.set({ key: this.PROFILE_KEY, value: JSON.stringify(profile) });
  }

  async loadProfile(): Promise<UserProfile | null> {
    const stored = await Preferences.get({ key: this.PROFILE_KEY });
    return stored.value ? (JSON.parse(stored.value) as UserProfile) : null;
  }

  async saveResult(result: TestResult): Promise<void> {
    const results = await this.loadResults();
    await Preferences.set({ key: this.RESULTS_KEY, value: JSON.stringify([...results, result]) });
  }

  async loadResults(): Promise<TestResult[]> {
    const stored = await Preferences.get({ key: this.RESULTS_KEY });
    return stored.value ? (JSON.parse(stored.value) as TestResult[]) : [];
  }

  async saveProgress(progress: UserProgress): Promise<void> {
    await Preferences.set({ key: this.PROGRESS_KEY, value: JSON.stringify(progress) });
  }

  async loadProgress(): Promise<UserProgress | null> {
    const stored = await Preferences.get({ key: this.PROGRESS_KEY });
    return stored.value ? (JSON.parse(stored.value) as UserProgress) : null;
  }
}
