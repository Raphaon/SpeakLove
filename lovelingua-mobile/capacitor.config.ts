import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovelingua.mobile',
  appName: 'LoveLingua',
  webDir: 'dist/lovelingua',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https'
  }
};

export default config;
