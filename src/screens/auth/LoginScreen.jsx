import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, Alert, View } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  AlertBanner,
  Card,
  FleetlyLogo,
  Input,
  Screen,
  ScreenActionButton,
} from '../../components/common';
import { login, persistAuth } from '../../services/authService';
import { setAuth } from '../../store/slices/authSlice';
import { getApiError } from '../../utils/api/error';
import { isValidEmail } from '../../utils/validation';
import { CONFIG } from '../../app/config';
import { colors, spacing, typography } from '../../theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const authData = await login(trimmedEmail, password);
      const payload = await persistAuth(authData);
      dispatch(setAuth(payload));
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Coming soon',
      'Password reset will be available in a future update. Please contact your fleet manager for help.',
    );
  };

  return (
    <Screen scroll contentStyle={styles.content}>
      <FleetlyLogo />

      <Card style={styles.formCard}>
        <View style={styles.formTitleContainer}>
          <Text style={styles.formTitle}>Sign in</Text>
        </View>

        <AlertBanner message={error} />

        <Input
          label="Email address"
          value={email}
          onChangeText={(value) => {
            setEmail(value);
            if (error) {
              setError('');
            }
          }}
          placeholder="you@example.com"
          keyboardType="email-address"
        />

        <Input
          label="Password"
          value={password}
          onChangeText={(value) => {
            setPassword(value);
            if (error) {
              setError('');
            }
          }}
          placeholder="Enter your password"
          secureTextEntry
          showPasswordToggle
        />

        <TouchableOpacity
          onPress={handleForgotPassword}
          style={styles.forgotLink}
        >
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>

        <ScreenActionButton
          title="Sign in"
          onPress={handleLogin}
          loading={loading}
          style={styles.signInButton}
        />
      </Card>

      <Text style={styles.footer}>
        Driver accounts are created by your fleet manager.
      </Text>

      {CONFIG.USE_MOCK_API ? (
        <Text style={styles.devHint}>
          Dev mode: any valid email + password &quot;123456&quot;
        </Text>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    paddingVertical: spacing.xxxl,
  },
  formCard: {
    marginBottom: spacing.lg,
  },
  formTitleContainer: {
    marginBottom: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formTitle: {
    ...typography.h2,
    color: colors.slate[800],
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  forgotLink: {
    alignSelf: 'flex-end',
    marginBottom: spacing.lg,
    marginTop: -spacing.sm,
  },
  forgotText: {
    ...typography.bodySmall,
    color: colors.primary[600],
    fontWeight: '600',
  },
  signInButton: {
    marginBottom: 0,
  },
  footer: {
    ...typography.caption,
    color: colors.slate[400],
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
  devHint: {
    ...typography.caption,
    color: colors.primary[600],
    textAlign: 'center',
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
});
