# Fastlane Setup Guide

Automated deployment tool for building and releasing your React Native app to Google Play Store.

## Prerequisites

- Ruby 2.6 or higher
- Bundler
- Android development environment configured
- Google Play Console account with app created

## Installation

### 1. Install Fastlane

**macOS (recommended):**
```bash
brew install fastlane
```

**Using RubyGems:**
```bash
gem install fastlane
```

**Using Bundler (recommended for project):**
```bash
cd ios
bundle install
```

For detailed installation instructions, see [Installing fastlane](https://docs.fastlane.tools/#installing-fastlane)

### 2. Install Fastlane Plugins

This project uses two fastlane plugins for version management. Install them using:

```bash
cd fastlane
fastlane install_plugins
```

Or install individually:
```bash
fastlane add_plugin increment_version_code
fastlane add_plugin increment_version_name
```

The plugins are defined in `fastlane/Pluginfile`:
- `fastlane-plugin-increment_version_code` - Increments Android version code
- `fastlane-plugin-increment_version_name` - Increments Android version name

## Configuration

### 1. Change Bundle ID / Package Name

Update the package name in `fastlane/Fastfile`:

```ruby
upload_to_play_store(
  track: "production",
  release_status: "completed",
  json_key: "fastlane/supply.json",
  package_name: "com.monokaijs.rapidboilerplate",  # ← Change this
  skip_upload_apk: true,
  timeout: 600,
)
```

**Important**: Also update the package name in:
- `android/app/build.gradle` - `applicationId` and `namespace`
- `android/app/src/main/AndroidManifest.xml` - package attribute
- `android/app/src/main/java/` - folder structure and package declarations

**Tip**: Use `react-native-rename` to change bundle ID across the entire project:
```bash
npx react-native-rename "NewAppName" -b com.yourcompany.newapp
```

### 2. Get Google Play Service Account JSON (supply.json)

To upload builds to Google Play Store, you need a service account key file.

#### Step-by-Step Guide:

**1. Create a Service Account:**

Go to [Google Cloud Console](https://console.cloud.google.com/)
- Select your project (or create one)
- Navigate to **IAM & Admin** → **Service Accounts**
- Click **Create Service Account**
- Name it (e.g., "fastlane-deployer")
- Click **Create and Continue**

**2. Grant Permissions:**

No need to grant any Google Cloud permissions at this step. Click **Continue** → **Done**

**3. Create and Download Key:**

- Click on the newly created service account
- Go to **Keys** tab
- Click **Add Key** → **Create new key**
- Select **JSON** format
- Click **Create**
- A JSON file will be downloaded automatically

**4. Link to Google Play Console:**

Go to [Google Play Console](https://play.google.com/console/)
- Select your app
- Go to **Setup** → **API access**
- Click **Link** next to Google Cloud Project (if not linked)
- Under **Service accounts**, find your service account
- Click **Grant access**
- Set permissions:
  - **Releases**: Create and edit releases
  - **Release to production, exclude devices, and use Play App Signing**: Yes
  - Click **Invite user** → **Send invite**

**5. Save the JSON file:**

- Rename the downloaded JSON file to `supply.json`
- Move it to `fastlane/supply.json` in your project
- **Important**: Add `supply.json` to `.gitignore` to keep it secure

```bash
# Add to .gitignore
echo "fastlane/supply.json" >> .gitignore
```

#### Alternative: Using fastlane init

You can also use fastlane's built-in setup:

```bash
cd android
fastlane supply init
```

This will guide you through the setup process and help you download the JSON key.

For more details, see:
- [Google Play Setup Guide](https://docs.fastlane.tools/getting-started/android/setup/)
- [Supply Documentation](https://docs.fastlane.tools/actions/supply/)

### 3. Configure Signing

Ensure your app is properly signed for release:

**Android:**
- Set up signing config in `android/app/build.gradle`
- Store keystore file securely
- Add keystore credentials to environment variables or gradle.properties



See [React Native Signing Guide](https://reactnative.dev/docs/signed-apk-android)

## Available Actions

### android push_production

Automated production deployment that:
1. Increments version code (build number)
2. Increments version name (semantic version - patch)
3. Commits version changes to git
4. Pushes changes to remote repository
5. Builds Android App Bundle (AAB)
6. Uploads to Google Play Store (Production track)

**Usage:**
```bash
cd android
bundle exec fastlane android push_production
```

Or from project root:
```bash
cd android && bundle exec fastlane android push_production
```

**What happens:**
- Version code: `1` → `2` → `3` (auto-incremented)
- Version name: `1.0.0` → `1.0.1` → `1.0.2` (patch bump)
- Git commit: "Version Bump [ci skip]"
- Build: Release AAB at `android/app/build/outputs/bundle/release/`
- Upload: Directly to Production track on Play Store

## Customization

### Change Version Bump Type

Edit `fastlane/Fastfile` to change version bump strategy:

```ruby
increment_version_name(
  gradle_file_path: "android/app/build.gradle",
  bump_type: "patch"  # Options: "major", "minor", "patch"
)
```

- `major`: 1.0.0 → 2.0.0
- `minor`: 1.0.0 → 1.1.0
- `patch`: 1.0.0 → 1.0.1

### Change Release Track

Modify the upload track in `fastlane/Fastfile`:

```ruby
upload_to_play_store(
  track: "production",  # Options: "internal", "alpha", "beta", "production"
  release_status: "completed",  # Options: "completed", "draft", "halted", "inProgress"
  # ...
)
```

### Add Release Notes

Create release notes in `fastlane/metadata/android/`:

```
fastlane/metadata/android/
├── en-US/
│   └── changelogs/
│       └── default.txt
├── vi-VN/
│   └── changelogs/
│       └── default.txt
```

Example `default.txt`:
```
- Bug fixes and performance improvements
- New feature: Dark mode support
- Updated translations
```

## Troubleshooting

### "Package not found" error

**Solution**: Ensure the `package_name` in Fastfile matches your app's package name in `android/app/build.gradle`

### "Unauthorized" or "403 Forbidden"

**Solutions**:
- Verify service account has correct permissions in Play Console
- Check that `supply.json` is valid and not corrupted
- Ensure the service account is linked to your app

### "Version code already exists"

**Solution**: The version code must be higher than any previous release. Manually increment it in `android/app/build.gradle` or delete the draft release in Play Console.

### Build fails

**Solutions**:
- Run `cd android && ./gradlew clean` to clean build cache
- Ensure signing configuration is correct
- Check that all dependencies are installed
- Verify Android SDK and build tools are up to date

### Git push fails

**Solutions**:
- Ensure you have push permissions to the repository
- Check that git remote is configured correctly
- If using CI/CD, configure git credentials

## Security Best Practices

1. **Never commit `supply.json`** - Add it to `.gitignore`
2. **Use environment variables** for sensitive data in CI/CD
3. **Rotate service account keys** periodically
4. **Limit service account permissions** to only what's needed
5. **Store keystore securely** - Use encrypted storage or CI/CD secrets

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Deploy to Play Store

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Set up Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: 3.0
          bundler-cache: true

      - name: Decode service account JSON
        run: echo "${{ secrets.PLAY_STORE_JSON }}" | base64 -d > fastlane/supply.json

      - name: Deploy to Play Store
        run: |
          cd android
          bundle exec fastlane android push_production
```

## Additional Resources

- [Fastlane Documentation](https://docs.fastlane.tools)
- [Fastlane Android Setup](https://docs.fastlane.tools/getting-started/android/setup/)
- [Google Play Console](https://play.google.com/console/)
- [React Native Publishing Guide](https://reactnative.dev/docs/signed-apk-android)

## Support

For issues with:
- **Fastlane**: Check [Fastlane GitHub Issues](https://github.com/fastlane/fastlane/issues)
- **Google Play**: See [Play Console Help](https://support.google.com/googleplay/android-developer)
- **This project**: Review the configuration files in `fastlane/` directory
