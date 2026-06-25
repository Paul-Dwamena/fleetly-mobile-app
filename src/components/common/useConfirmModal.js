import { useCallback, useState } from 'react';

export function useConfirmModal() {
  const [options, setOptions] = useState(null);
  const [loading, setLoading] = useState(false);

  const close = useCallback(() => {
    if (loading) {
      return;
    }

    setOptions(null);
  }, [loading]);

  const confirm = useCallback((config) => {
    setOptions(config);
  }, []);

  const handleConfirm = useCallback(async () => {
    if (!options?.onConfirm) {
      setOptions(null);
      return;
    }

    setLoading(true);

    try {
      await options.onConfirm();
      setOptions(null);
    } catch {
      setOptions(null);
    } finally {
      setLoading(false);
    }
  }, [options]);

  const confirmModalProps = {
    visible: Boolean(options),
    title: options?.title ?? '',
    message: options?.message ?? '',
    confirmLabel: options?.confirmLabel ?? 'Confirm',
    cancelLabel: options?.cancelLabel ?? 'Cancel',
    variant: options?.variant ?? 'primary',
    loading,
    onConfirm: handleConfirm,
    onCancel: close,
  };

  return { confirm, close, confirmModalProps };
}
