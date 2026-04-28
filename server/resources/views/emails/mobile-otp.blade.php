<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset OTP - SolarVast</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f8f9fa;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .email-header {
            background: linear-gradient(135deg, #2563eb, #3b82f6);
            padding: 40px 30px;
            text-align: center;
            color: white;
        }

        .logo {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
            letter-spacing: 1px;
        }

        .header-subtitle {
            font-size: 16px;
            opacity: 0.9;
            font-weight: 300;
        }

        .email-body {
            padding: 40px 30px;
        }

        .greeting {
            font-size: 24px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 20px;
        }

        .message {
            font-size: 16px;
            color: #6b7280;
            margin-bottom: 30px;
            line-height: 1.7;
        }

        .otp-container {
            background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
            border-radius: 12px;
            padding: 30px;
            text-align: center;
            margin: 30px 0;
            border-left: 4px solid #2563eb;
        }

        .otp-label {
            font-size: 14px;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 600;
            margin-bottom: 15px;
        }

        .otp-code {
            font-size: 36px;
            font-weight: bold;
            color: #2563eb;
            letter-spacing: 8px;
            font-family: 'Courier New', monospace;
            background-color: #ffffff;
            padding: 15px 25px;
            border-radius: 8px;
            display: inline-block;
            border: 2px dashed #2563eb;
            margin-bottom: 15px;
        }

        .otp-validity {
            font-size: 14px;
            color: #ef4444;
            font-weight: 500;
        }

        .instructions {
            background-color: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 20px;
            border-radius: 6px;
            margin: 25px 0;
        }

        .instructions-title {
            font-size: 16px;
            font-weight: 600;
            color: #92400e;
            margin-bottom: 10px;
        }

        .instructions ul {
            color: #92400e;
            padding-left: 20px;
        }

        .instructions li {
            margin-bottom: 5px;
        }

        .security-notice {
            background-color: #fef2f2;
            border-left: 4px solid #ef4444;
            padding: 20px;
            border-radius: 6px;
            margin: 25px 0;
        }

        .security-title {
            font-size: 16px;
            font-weight: 600;
            color: #dc2626;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
        }

        .security-icon {
            width: 20px;
            height: 20px;
            margin-right: 8px;
        }

        .security-text {
            color: #dc2626;
            font-size: 14px;
            line-height: 1.6;
        }

        .email-footer {
            background-color: #f9fafb;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }

        .footer-text {
            font-size: 14px;
            color: #6b7280;
            margin-bottom: 15px;
        }

        .company-info {
            font-size: 12px;
            color: #9ca3af;
            line-height: 1.5;
        }

        .divider {
            height: 2px;
            background: linear-gradient(to right, #e5e7eb, #2563eb, #e5e7eb);
            margin: 30px 0;
            border-radius: 1px;
        }

        @media only screen and (max-width: 600px) {
            .email-container {
                margin: 0;
                border-radius: 0;
            }

            .email-header,
            .email-body,
            .email-footer {
                padding: 25px 20px;
            }

            .otp-code {
                font-size: 28px;
                letter-spacing: 4px;
                padding: 12px 20px;
            }

            .greeting {
                font-size: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="email-header">
            <div class="logo">🌞 SolarVast</div>
            <div class="header-subtitle">Solar Security Camera System</div>
        </div>

        <!-- Body -->
        <div class="email-body">
            <div class="greeting">Password Reset Request</div>

            <p class="message">
                Hello,<br><br>
                We received a request to reset the password for your SolarVast account associated with <strong>{{ $email }}</strong>.
                Use the OTP code below to proceed with resetting your password.
            </p>

            <div class="otp-container">
                <div class="otp-label">Your OTP Code</div>
                <div class="otp-code">{{ $token }}</div>
                <div class="otp-validity">⏱️ Valid for 10 minutes only</div>
            </div>

            <div class="instructions">
                <div class="instructions-title">📋 How to use this OTP:</div>
                <ul>
                    <li>Open your SolarVast mobile app</li>
                    <li>Go to the password reset verification screen</li>
                    <li>Enter the 6-digit OTP code above</li>
                    <li>Create your new secure password</li>
                </ul>
            </div>

            <div class="divider"></div>

            <div class="security-notice">
                <div class="security-title">
                    <svg class="security-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                    </svg>
                    Security Notice
                </div>
                <div class="security-text">
                    <strong>Important:</strong> If you didn't request this password reset, please ignore this email and ensure your account is secure.
                    Never share this OTP with anyone. Our team will never ask for your OTP via phone or email.
                </div>
            </div>

            <p class="message">
                If you're having trouble with the password reset process, please contact our support team at
                <a href="mailto:info@solarvast.com.ng" style="color: #2563eb; text-decoration: none;">info@solarvast.com.ng</a>
            </p>
        </div>

        <!-- Footer -->
        <div class="email-footer">
            <div class="footer-text">
                Thank you for choosing SolarVast for your security needs.
            </div>
            <div class="company-info">
                <strong>SolarVast Technologies</strong><br>
                Solar-Powered Security Solutions<br>
                Email: info@solarvast.com.ng | Website: www.solarvast.ng<br>
                <br>
                <small>This is an automated message. Please do not reply to this email.</small>
            </div>
        </div>
    </div>
</body>
</html>
