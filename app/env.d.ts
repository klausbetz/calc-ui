/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_API_URL: string
  readonly VITE_AUTH_AUTHORITY: string
  readonly VITE_AUTH_METADATA_URL: string
  readonly VITE_AUTH_CLIENT_ID: string
  readonly VITE_API_GATEWAY_URL: string
  readonly VITE_SENTRY_DSN: string
  readonly VITE_SENTRY_ENVIRONMENT: string
  readonly PACKAGE_VERSION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}