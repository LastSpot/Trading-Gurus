# Trading Gurus

Group Member: Michael Le, Long Vo, John Le, Toan Tran, Aalya Vora

## Introduction
Optimal Currency Exchange Path Finder

A web app that helps users find the most cost-effective route to exchange currencies. By leveraging real-time exchange rates and advanced algorithms, it identifies alternative multi-currency conversion paths that may yield better overall rates than direct exchanges.

## How It Works

1. User inputs start currency (A) and desired currency (B)
2. Calculates direct A → B exchange rate
3. Explores all possible paths like A → C → … → D → B
4. Identifies optimal path with best overall rate
5. Presents user with optimal path and potential savings

## Purpose

1. Save money on currency exchanges/make the most money
2. Make informed decisions with real-time data
3. User-friendly interface and streamlined process

## Installation Guide

Begin by installing all node modules require:

    npm install 

Ensure to have a Python compiler. Can be found and install through here: https://www.python.org/downloads/

Start frontend:

    cd client
    npm start

Start backend:

    cd server
    npm start (or npm run dev)

### Note: start backend before the frontend to ensure the web is running smoothly

## Database

We used AWS RDS for our database. Our data is stored inside PostgreSQL runs by AWS RDS.