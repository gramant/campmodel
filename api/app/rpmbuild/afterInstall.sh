#!/bin/bash
systemctl daemon-reload
systemctl enable sitefilter.service
systemctl restart sitefilter.service
