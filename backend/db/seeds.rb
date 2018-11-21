# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Event.destroy_all
Event.create(name: "Pick flowers", time: "13:30 AM", address: "1910 Winter st", date: "Tue Nov 20 2018 00:00:00 GMT-0600 (Central Standard Time)")
Event.create(name: "cooking", time: "11:30 AM", address: "1910 Winter st", date: "Tue Nov 20 2018 00:00:00 GMT-0600 (Central Standard Time)")
Event.create(name: "setting up", time: "12:30 AM", address: "1910 Winter st", date: "Tue Nov 20 2018 00:00:00 GMT-0600 (Central Standard Time)")
Event.create(name: "walking the dog", time: "1:30 AM", address: "1910 Winter st", date: "Tue Nov 20 2018 00:00:00 GMT-0600 (Central Standard Time)")
Event.create(name: "reading", time: "12:30 AM", address: "1910 Winter st", date: "Tue Nov 20 2018 00:00:00 GMT-0600 (Central Standard Time)")