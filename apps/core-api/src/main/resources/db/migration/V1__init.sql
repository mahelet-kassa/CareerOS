-- V1: foundation. users only — every future entity hangs off this.
-- pgvector extension is enabled here (image ships it) so later migrations can
-- add embedding columns without an infra change.

CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE users (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email         TEXT NOT NULL UNIQUE,
    auth_provider TEXT NOT NULL DEFAULT 'password', -- 'password' | 'google' | 'github'
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_users_email ON users (email);
