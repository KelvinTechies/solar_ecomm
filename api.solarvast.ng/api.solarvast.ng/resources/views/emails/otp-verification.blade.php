<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email - SolarVast</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #fff;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
            opacity: 0.3;
        }
        
        .logo {
            position: relative;
            z-index: 1;
        }
        
        .logo img {
            height: 50px;
            width: auto;
            filter: brightness(0) invert(1);
        }
        
        .header-title {
            color: #fff;
            font-size: 28px;
            font-weight: 700;
            margin-top: 20px;
            position: relative;
            z-index: 1;
        }
        
        .header-subtitle {
            color: rgba(255,255,255,0.9);
            font-size: 16px;
            margin-top: 8px;
            position: relative;
            z-index: 1;
        }
        
        .content {
            padding: 50px 40px;
            background: #fff;
            position: relative;
        }
        
        .welcome-text {
            font-size: 18px;
            color: #333;
            margin-bottom: 10px;
            font-weight: 600;
        }
        
        .description {
            color: #666;
            font-size: 16px;
            line-height: 1.7;
            margin-bottom: 35px;
        }
        
        .otp-container {
            text-align: center;
            margin: 40px 0;
            padding: 30px;
            background: linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%);
            border-radius: 16px;
            border: 2px dashed #2196F3;
            position: relative;
        }
        
        .otp-label {
            font-size: 14px;
            color: #666;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 600;
        }
        
        .otp-code {
            font-size: 48px;
            font-weight: 800;
            color: #2196F3;
            letter-spacing: 8px;
            margin: 0;
            text-shadow: 2px 2px 4px rgba(33,150,243,0.2);
            font-family: 'Courier New', monospace;
        }
        
        .otp-timer {
            margin-top: 15px;
            font-size: 14px;
            color: #ff9800;
            font-weight: 600;
        }
        
        .instructions {
            background: #f8f9fa;
            padding: 25px;
            border-radius: 12px;
            margin: 30px 0;
            border-left: 4px solid #2196F3;
        }
        
        .instructions h3 {
            color: #333;
            font-size: 16px;
            margin-bottom: 12px;
            font-weight: 600;
        }
        
        .instructions ol {
            color: #666;
            margin-left: 20px;
        }
        
        .instructions li {
            margin-bottom: 8px;
            font-size: 14px;
        }
        
        .security-notice {
            background: linear-gradient(135deg, #fff3e0 0%, #ffe8cc 100%);
            padding: 20px;
            border-radius: 12px;
            margin: 25px 0;
            border: 1px solid #ffcc80;
        }
        
        .security-icon {
            display: inline-block;
            margin-right: 8px;
            color: #ff9800;
        }
        
        .security-text {
            font-size: 14px;
            color: #e65100;
            font-weight: 500;
        }
        
        .footer {
            background: #f8f9fa;
            padding: 30px 40px;
            text-align: center;
            border-top: 1px solid #eee;
        }
        
        .footer-text {
            font-size: 14px;
            color: #666;
            margin-bottom: 15px;
        }
        
        .social-links {
            margin: 20px 0;
        }
        
        .social-link {
            display: inline-block;
            margin: 0 10px;
            padding: 8px 12px;
            background: #2196F3;
            color: #fff;
            text-decoration: none;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .social-link:hover {
            background: #1976D2;
            transform: translateY(-2px);
        }
        
        .contact-info {
            font-size: 12px;
            color: #999;
            margin-top: 20px;
        }
        
        .divider {
            height: 2px;
            background: linear-gradient(90deg, transparent, #2196F3, transparent);
            margin: 30px 0;
        }
        
        /* Responsive Design */
        @media only screen and (max-width: 600px) {
            .email-container {
                margin: 10px;
                border-radius: 15px;
            }
            
            .header {
                padding: 30px 20px;
            }
            
            .header-title {
                font-size: 24px;
            }
            
            .content {
                padding: 30px 25px;
            }
            
            .otp-code {
                font-size: 36px;
                letter-spacing: 4px;
            }
            
            .otp-container {
                padding: 25px 15px;
                margin: 30px 0;
            }
            
            .footer {
                padding: 25px 20px;
            }
            
            .social-link {
                display: block;
                margin: 5px 0;
                text-align: center;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <div class="logo">
                <img src="https://solarvast.ng/blog/assets/images/logo/logo_text.png" alt="SolarVast Logo">
            </div>
            <h1 class="header-title">Verify Your Email</h1>
            <p class="header-subtitle">Welcome to the future of solar energy</p>
        </div>
        
        <!-- Main Content -->
        <div class="content">
            <p class="welcome-text">Hello {{$user->name}}!</p>
            
            <p class="description">
                Thank you for joining SolarVast! To complete your registration and secure your account, 
                please verify your email address using the One-Time Password (OTP) below.
            </p>
            
            <div class="otp-container">
                <div class="otp-label">Your Verification Code</div>
                <div class="otp-code">{{$otp}}</div>
                <div class="otp-timer">⏰ Expires in 10 minutes</div>
            </div>
            
            <div class="instructions">
                <h3>🚀 How to verify your account:</h3>
                <ol>
                    <li>Open the SolarVast app on your device</li>
                    <li>Navigate to the email verification screen</li>
                    <li>Enter the 6-digit code shown above</li>
                    <li>Click "Verify" to complete your registration</li>
                </ol>
            </div>
            
            <div class="divider"></div>
            
            <div class="security-notice">
                <span class="security-icon">🔒</span>
                <span class="security-text">
                    <strong>Security Notice:</strong> This code is confidential and for your use only. 
                    Never share it with anyone. If you didn't request this verification, please ignore this email.
                </span>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p class="footer-text">
                Need help? We're here for you 24/7
            </p>
            
            <div class="social-links">
                <a href="https://solarvast.ng" class="social-link">🌐 Visit Website</a>
                <a href="mailto:info@solarvast.ng" class="social-link">📧 Contact Support</a>
                <!--<a href="tel:+234-xxx-xxx-xxxx" class="social-link">📞 Call Us</a>-->
            </div>
            
            <div class="contact-info">
                <p>SolarVast Nigeria | Powering Tomorrow, Today</p>
                <p>📍 Benin City, Nigeria | 📧 info@solarvast.ng</p>
                <p style="margin-top: 10px; font-size: 11px;">
                    © 2025 SolarVast. All rights reserved. | 
                    <a href="https://solarvast.ng/privacy" style="color: #2196F3; text-decoration: none;">Privacy Policy</a> | 
                    <a href="https://solarvast.ng/terms" style="color: #2196F3; text-decoration: none;">Terms of Service</a>
                </p>
            </div>
        </div>
    </div>
</body>
</html>