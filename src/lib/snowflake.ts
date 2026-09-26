/**
 * Discord Snowflake ID to Timestamp and Metadata Decoder.
 * Discord Epoch starts at 1420070400000 (2015-01-01T00:00:00.000Z).
 * Formula: timestamp = (snowflake >> 22) + 1420070400000
 */

export interface SnowflakeDecodeResult {
  valid: boolean;
  snowflake: string;
  timestampMs: number;
  timestampSeconds: number;
  dateIso: string;
  dateUtc: string;
  workerId: number;
  processId: number;
  increment: number;
  discordTagShortDate: string;
  discordTagRelative: string;
  errorMessage?: string;
}

const DISCORD_EPOCH = BigInt("1420070400000");

export function decodeDiscordSnowflake(rawId: string): SnowflakeDecodeResult {
  const cleanId = rawId.trim();

  // Basic validation: Discord snowflakes are 17-20 digit numeric strings
  if (!cleanId || !/^\d{16,21}$/.test(cleanId)) {
    return {
      valid: false,
      snowflake: cleanId,
      timestampMs: 0,
      timestampSeconds: 0,
      dateIso: "",
      dateUtc: "",
      workerId: 0,
      processId: 0,
      increment: 0,
      discordTagShortDate: "",
      discordTagRelative: "",
      errorMessage: "Please enter a valid 17 to 20 digit Discord Snowflake ID.",
    };
  }

  try {
    const snowflakeBigInt = BigInt(cleanId);
    const timestampMsBigInt = (snowflakeBigInt >> BigInt(22)) + DISCORD_EPOCH;
    const timestampMs = Number(timestampMsBigInt);
    const timestampSeconds = Math.floor(timestampMs / 1000);

    // Sanity check: creation date must be between 2015 and future
    if (timestampMs < Number(DISCORD_EPOCH) || timestampMs > 253402300799000) {
      return {
        valid: false,
        snowflake: cleanId,
        timestampMs: 0,
        timestampSeconds: 0,
        dateIso: "",
        dateUtc: "",
        workerId: 0,
        processId: 0,
        increment: 0,
        discordTagShortDate: "",
        discordTagRelative: "",
        errorMessage: "Snowflake resolves outside of Discord historical operating range.",
      };
    }

    const date = new Date(timestampMs);
    const workerId = Number((snowflakeBigInt & BigInt("0x3e0000")) >> BigInt(17));
    const processId = Number((snowflakeBigInt & BigInt("0x1f000")) >> BigInt(12));
    const increment = Number(snowflakeBigInt & BigInt("0xfff"));

    return {
      valid: true,
      snowflake: cleanId,
      timestampMs,
      timestampSeconds,
      dateIso: date.toISOString(),
      dateUtc: date.toUTCString(),
      workerId,
      processId,
      increment,
      discordTagShortDate: `<t:${timestampSeconds}:f>`,
      discordTagRelative: `<t:${timestampSeconds}:R>`,
    };
  } catch {
    return {
      valid: false,
      snowflake: cleanId,
      timestampMs: 0,
      timestampSeconds: 0,
      dateIso: "",
      dateUtc: "",
      workerId: 0,
      processId: 0,
      increment: 0,
      discordTagShortDate: "",
      discordTagRelative: "",
      errorMessage: "Invalid numeric snowflake representation.",
    };
  }
}
