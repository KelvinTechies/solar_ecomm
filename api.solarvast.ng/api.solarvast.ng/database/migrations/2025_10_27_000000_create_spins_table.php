<?php

// Migration: create_spins_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSpinsTable extends Migration
{
    public function up()
    {
        Schema::create('user_spins', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->integer('total_points')->default(0);
            $table->timestamp('last_spin_date')->nullable();
            $table->integer('lucky_day_count')->default(0);
            $table->date('lucky_day_reset_date')->nullable();
            $table->timestamps();
        });

        Schema::create('spin_history', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('spin_result');
            $table->integer('points_earned')->default(0);
            $table->timestamp('spin_date');
            $table->timestamps();
        });

        Schema::create('withdrawals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->decimal('amount', 10, 2);
            $table->string('wallet_address');
            $table->boolean('is_lucky_day')->default(false);
            $table->enum('status', ['pending', 'completed', 'failed'])->default('pending');
            $table->timestamps();
        });

        // Add wallet_balance to users table if not exists
        if (!Schema::hasColumn('users', 'wallet_balance')) {
            Schema::table('users', function (Blueprint $table) {
                $table->decimal('wallet_balance', 15, 2)->default(0)->after('email');
            });
        }

        // Create wallet_transactions table
        Schema::create('wallet_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['credit', 'debit']);
            $table->decimal('amount', 10, 2);
            $table->text('description')->nullable();
            $table->decimal('balance_after', 15, 2);
            $table->timestamps();
            
            $table->index('user_id');
            $table->index('created_at');
        });
    }

    public function down()
    {
        Schema::dropIfExists('wallet_transactions');
        
        if (Schema::hasColumn('users', 'wallet_balance')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('wallet_balance');
            });
        }
        
        Schema::dropIfExists('withdrawals');
        Schema::dropIfExists('spin_history');
        Schema::dropIfExists('user_spins');
    }
}