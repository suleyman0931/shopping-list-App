import {useState, useEffect, useCallback} from "react";
import './App.css';

// LANGUAGE TRANSLATIONS - English and Amharic
const translations = {
  en: {
    title: "🛒 Shopping List",
    subtitle: "Organize your shopping like a pro",
    yourItems: "Your Shopping Items",
    addNewItem: "Add New Item",
    itemName: "Item Name",
    quantity: "Quantity",
    price: "Price (ብር)",
    priorityOrder: "Priority Order",
    priorityHelp: "Lower numbers appear first (1, 2, 3...)",
    addItemButton: "Add Item (Status: Planned)",
    shoppingSummary: "📊 Shopping Summary",
    totalBudget: "Total Budget",
    alreadySpent: "Already Spent",
    stillToBuy: "Still to Buy",
    items: "items",
    itemsBought: "items bought",
    itemsPlanned: "items planned",
    shoppingProgress: "Shopping Progress",
    complete: "Complete",
    clickToUpdate: "Click to update status",
    updateStatusFor: "Update Status for",
    currentStatus: "Current status",
    planned: "Planned",
    bought: "Bought",
    cancel: "Cancel",
    showForm: "+ Add New Item to Buy",
    hideForm: "Hide Form",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    language: "Language",
    totalCost: "Total Cost",
    priority: "Priority",
    shoppingDate: "Shopping Date",
    shoppingDateHelp: "When do you plan to shop?",
    enableNotifications: "📱 Enable Daily Reminders",
    notificationsEnabled: "✅ Daily Reminders On",
    notificationsDisabled: "🔕 Daily Reminders Off",
    notificationTitle: "🛒 Shopping Reminder",
    notificationBody: "Good morning! Don't forget to check your shopping list today.",
    permissionDenied: "Notifications blocked. Enable in browser settings.",
    scheduleFor: "Scheduled for",
    today: "Today",
    tomorrow: "Tomorrow",
    thisWeek: "This Week",
    nextWeek: "Next Week",
    settings: "Settings",
    marketDays: "Market Days",
    marketDaysHelp: "Select your town's market days",
    monday: "Monday",
    tuesday: "Tuesday", 
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
    saveSettings: "Save Settings",
    aboutApp: "About App",
    developer: "Developer",
    version: "Version",
    contact: "Contact",
    marketDayReminder: "Market Day Reminder",
    marketDayNotification: "Today is market day! Time to check your shopping list.",
    noMarketDaysSelected: "Please select your market days first",
    marketDaysUpdated: "Market days updated successfully",
    editItem: "Edit Item",
    updateItem: "Update Item",
    itemUpdated: "Item updated successfully",
    deleteItem: "Delete Item",
    deleteConfirm: "Are you sure you want to delete",
    update: "Update",
    delete: "Delete",
    moreActions: "More Actions",
    emptyStateTitle: "Your shopping list is empty",
    emptyStateMessage: "Start by adding items you want to buy. Set priorities, dates, and track your shopping progress!",
    aboutUs: "About Us",
    contactUs: "Contact Us",
    help: "Help",
    appSettings: "App Settings",
    notifications: "Notifications",
    about: "About",
    marketDayReminders: "Market Day Reminders",
    reminderOn: "ON - You'll get reminders",
    reminderOff: "OFF - No reminders",
    weeklyReport: "Weekly Report",
    viewReports: "View Weekly Reports",
    currentWeek: "Current Week",
    previousWeek: "Previous Week",
    weekOf: "Week of",
    completionRate: "Completion Rate",
    itemsCompleted: "Items Completed",
    totalSpent: "Total Spent",
    budgetRemaining: "Budget Remaining",
    noReportsYet: "No weekly reports yet",
    reportSaved: "Weekly report saved!",
    newWeekStarted: "New week started! Previous items archived.",
    viewPreviousWeek: "View Previous Week",
    backToCurrentWeek: "Back to Current Week",
    weeklyReports: "Weekly Reports",
    selectWeek: "Select Week",
    reportDetails: "Report Details"
  },
  am: {
    title: "🛒 የግዢ ዝርዝር",
    subtitle: "የግዢዎን እንደ ባለሙያ ያደራጁ",
    yourItems: "የእርስዎ የግዢ እቃዎች",
    addNewItem: "አዲስ እቃ ያክሉ",
    itemName: "የእቃ ስም",
    quantity: "ብዛት",
    price: "ዋጋ (ብር)",
    priorityOrder: "የቅድሚያ ቅደም ተከተል",
    priorityHelp: "ዝቅተኛ ቁጥሮች በመጀመሪያ ይታያሉ (1, 2, 3...)",
    addItemButton: "እቃ ያክሉ (ሁኔታ: የታቀደ)",
    shoppingSummary: "📊 የግዢ ማጠቃለያ",
    totalBudget: "አጠቃላይ በጀት",
    alreadySpent: "የተወጣ",
    stillToBuy: "ለመግዛት የቀረ",
    items: "እቃዎች",
    itemsBought: "የተገዙ እቃዎች",
    itemsPlanned: "የታቀዱ እቃዎች",
    shoppingProgress: "የግዢ እድገት",
    complete: "ተጠናቅቋል",
    clickToUpdate: "ሁኔታን ለመቀየር ይጫኑ",
    updateStatusFor: "ሁኔታን ይቀይሩ ለ",
    currentStatus: "አሁን ያለ ሁኔታ",
    planned: "የታቀደ",
    bought: "የተገዛ",
    cancel: "ይቅር",
    showForm: "የመጨመሪያ ቅጽ አሳይ",
    hideForm: "ቅጽ ደብቅ",
    darkMode: "ጨለማ ሁነታ",
    lightMode: "ብርሃን ሁነታ",
    language: "ቋንቋ",
    totalCost: "አጠቃላይ ዋጋ",
    priority: "ቅድሚያ",
    shoppingDate: "የግዢ ቀን",
    shoppingDateHelp: "መቼ ለመግዛት ያቅዳሉ?",
    enableNotifications: "📱 የቀን ማስታወሻ አንቃ",
    notificationsEnabled: "✅ የቀን ማስታወሻ በርቷል",
    notificationsDisabled: "🔕 የቀን ማስታወሻ ጠፍቷል",
    notificationTitle: "🛒 የግዢ ማስታወሻ",
    notificationBody: "እንደምን አደሩ! የዛሬን የግዢ ዝርዝር መመልከትዎን አይርሱ።",
    permissionDenied: "ማስታወሻዎች ታግደዋል። በአሳሽ ቅንብሮች ውስጥ ያንቁ።",
    scheduleFor: "የታቀደለት",
    today: "ዛሬ",
    tomorrow: "ነገ",
    thisWeek: "በዚህ ሳምንት",
    nextWeek: "በሚቀጥለው ሳምንት",
    settings: "ቅንብሮች",
    marketDays: "የገበያ ቀናት",
    marketDaysHelp: "የከተማዎን የገበያ ቀናት ይምረጡ",
    monday: "ሰኞ",
    tuesday: "ማክሰኞ",
    wednesday: "ረቡዕ", 
    thursday: "ሐሙስ",
    friday: "አርብ",
    saturday: "ቅዳሜ",
    sunday: "እሁድ",
    saveSettings: "ቅንብሮች አስቀምጥ",
    aboutApp: "ስለ መተግበሪያው",
    developer: "ገንቢ",
    version: "ስሪት",
    contact: "ለመገናኘት",
    marketDayReminder: "የገበያ ቀን ማስታወሻ",
    marketDayNotification: "ዛሬ የገበያ ቀን ነው! የግዢ ዝርዝርዎን ለመመልከት ጊዜው ደርሷል።",
    noMarketDaysSelected: "እባክዎ መጀመሪያ የገበያ ቀናትዎን ይምረጡ",
    marketDaysUpdated: "የገበያ ቀናት በተሳካ ሁኔታ ተዘምነዋል",
    editItem: "እቃ አርም",
    updateItem: "እቃ አዘምን",
    itemUpdated: "እቃ በተሳካ ሁኔታ ተዘምኗል",
    deleteItem: "እቃ ሰርዝ",
    deleteConfirm: "እርግጠኛ ነዎት መሰረዝ የሚፈልጉት",
    update: "አዘምን",
    delete: "ሰርዝ",
    moreActions: "ተጨማሪ ተግባራት",
    emptyStateTitle: "የእርስዎ የግዢ ዝርዝር ባዶ ነው",
    emptyStateMessage: "መግዛት የሚፈልጓቸውን እቃዎች በመጨመር ይጀምሩ። ቅድሚያዎችን፣ ቀናትን ያስቀምጡ እና የግዢ እድገትዎን ይከታተሉ!",
    aboutUs: "ስለ እኛ",
    contactUs: "ያግኙን",
    help: "እርዳታ",
    appSettings: "የመተግበሪያ ቅንብሮች",
    notifications: "ማሳወቂያዎች",
    about: "ስለ",
    marketDayReminders: "የገበያ ቀን ማስታወሻዎች",
    reminderOn: "በርቷል - ማስታወሻዎችን ይቀበላሉ",
    reminderOff: "ጠፍቷል - ማስታወሻ የለም",
    weeklyReport: "ሳምንታዊ ሪፖርት",
    viewReports: "ሳምንታዊ ሪፖርቶችን ይመልከቱ",
    currentWeek: "የአሁኑ ሳምንት",
    previousWeek: "ያለፈው ሳምንት",
    weekOf: "ሳምንት የ",
    completionRate: "የመጠናቀቅ መጠን",
    itemsCompleted: "የተጠናቀቁ እቃዎች",
    totalSpent: "አጠቃላይ የተወጣ",
    budgetRemaining: "የቀረ በጀት",
    noReportsYet: "ገና ሳምንታዊ ሪፖርት የለም",
    reportSaved: "ሳምንታዊ ሪፖርት ተቀምጧል!",
    newWeekStarted: "አዲስ ሳምንት ተጀመረ! ያለፉ እቃዎች ተቀምጠዋል።",
    viewPreviousWeek: "ያለፈውን ሳምንት ይመልከቱ",
    backToCurrentWeek: "ወደ አሁኑ ሳምንት ተመለስ",
    weeklyReports: "ሳምንታዊ ሪፖርቶች",
    selectWeek: "ሳምንት ይምረጡ",
    reportDetails: "የሪፖርት ዝርዝሮች"
  }
};

// Start with empty list - no static sample data
const sampleItems = [];

// WEEKLY REPORT UTILITIES
const getWeekKey = (date = new Date()) => {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay()); // Start of week (Sunday)
  startOfWeek.setHours(0, 0, 0, 0);
  return startOfWeek.toISOString().split('T')[0]; // YYYY-MM-DD format
};

const getCurrentWeekKey = () => getWeekKey();

// STORAGE UTILITIES
const STORAGE_KEYS = {
  CURRENT_ITEMS: 'shopping_items_current',
  WEEKLY_REPORTS: 'shopping_weekly_reports',
  SETTINGS: 'shopping_settings'
};

const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

const loadFromStorage = (key, defaultValue = null) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return defaultValue;
  }
};

// WEEKLY REPORT FUNCTIONS
const generateWeeklyReport = (items, weekKey) => {
  const totalItems = items.length;
  const boughtItems = items.filter(item => item.status === 'bought');
  const plannedItems = items.filter(item => item.status === 'planned');
  
  const totalBudget = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalSpent = boughtItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const remainingBudget = totalBudget - totalSpent;
  
  return {
    weekKey,
    date: new Date().toISOString(),
    totalItems,
    boughtItems: boughtItems.length,
    plannedItems: plannedItems.length,
    totalBudget,
    totalSpent,
    remainingBudget,
    completionRate: totalItems > 0 ? Math.round((boughtItems.length / totalItems) * 100) : 0,
    items: items.map(item => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      status: item.status,
      totalCost: item.price * item.quantity
    }))
  };
};

const saveWeeklyReport = (items) => {
  const currentWeek = getCurrentWeekKey();
  const reports = loadFromStorage(STORAGE_KEYS.WEEKLY_REPORTS, {});
  
  reports[currentWeek] = generateWeeklyReport(items, currentWeek);
  saveToStorage(STORAGE_KEYS.WEEKLY_REPORTS, reports);
  
  console.log('Weekly report saved for week:', currentWeek);
  return reports[currentWeek];
};

const getWeeklyReports = () => {
  return loadFromStorage(STORAGE_KEYS.WEEKLY_REPORTS, {});
};

export default function App() {
  // STATE MANAGEMENT - These are like variables that React watches for changes
  const [items, setItems] = useState(sampleItems); // Main list of shopping items
  const [selectedItem, setSelectedItem] = useState(null); // Which item is selected for status update
  const [showModal, setShowModal] = useState(false); // Whether to show the status update modal
  const [showEditModal, setShowEditModal] = useState(false); // Whether to show the edit item modal
  const [showForm, setShowForm] = useState(false); // Whether to show the add item form
  const [showSettings, setShowSettings] = useState(false); // Whether to show settings panel
  const [showTopMenu, setShowTopMenu] = useState(false); // Whether to show top menu
  const [showReportsModal, setShowReportsModal] = useState(false); // Whether to show weekly reports modal
  const [showAboutModal, setShowAboutModal] = useState(false); // Whether to show about us modal
  const [showHelpModal, setShowHelpModal] = useState(false); // Whether to show help modal
  const [showWeeklyResetNotification, setShowWeeklyResetNotification] = useState(false); // Whether to show weekly reset notification
  const [darkMode, setDarkMode] = useState(false); // Dark/Light mode toggle
  const [language, setLanguage] = useState('en'); // Language selection (en/am)
  const [shoppingDate, setShoppingDate] = useState(''); // When user plans to shop
  const [notificationsEnabled, setNotificationsEnabled] = useState(false); // Daily reminders
  const [marketDays, setMarketDays] = useState([]); // Selected market days (0=Sunday, 1=Monday, etc.)
  const [currentWeekKey, setCurrentWeekKey] = useState(''); // Current week identifier
  const [weeklyReports, setWeeklyReports] = useState({}); // All weekly reports
  
  // FORM STATE - These hold the values from the form inputs
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState(0);
  const [itemPrice, setItemPrice] = useState(0);
  const [itemOrder, setItemOrder] = useState(0);
  
  // EDIT FORM STATE - For editing existing items
  const [editItemName, setEditItemName] = useState("");
  const [editItemQuantity, setEditItemQuantity] = useState(0);
  const [editItemPrice, setEditItemPrice] = useState(0);
  const [editItemOrder, setEditItemOrder] = useState(0);
  const [editShoppingDate, setEditShoppingDate] = useState("");
  
  // Get current language translations
  const t = translations[language];
  
  // HANDLE FORM SUBMISSION - This runs when user clicks "Add Item"
  function handleSubmit(e) {
    e.preventDefault(); // Prevents page from refreshing
    
    // Create a new item object with form data
    const newItem = {
      id: Date.now(), // Use timestamp as unique ID
      name: itemName,
      quantity: Number(itemQuantity), // Convert string to number
      price: Number(itemPrice),
      order: Number(itemOrder), // This is the priority (1 = highest priority)
      status: "planned", // All new items start as "planned"
      shoppingDate: shoppingDate // When user plans to shop
    };
    
    // Add new item to the list using spread operator (...)
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    
    // Save to localStorage
    saveToStorage(STORAGE_KEYS.CURRENT_ITEMS, updatedItems);
    
    // Clear the form after adding item
    setItemName("");
    setItemQuantity(0);
    setItemPrice(0);
    setItemOrder(0);
    setShoppingDate("");
    
    // Hide form after adding item
    setShowForm(false);
    
    console.log('New item added:', newItem);
  }

  // HANDLE ITEM CLICK - This runs when user clicks on a shopping item body
  function handleItemClick(item) {
    // Show status update modal when clicking on item body
    setSelectedItem(item);
    setShowModal(true);
  }

  // HANDLE EDIT ITEM - This runs when user clicks edit button
  function handleEditItem(item, event) {
    event.stopPropagation(); // Prevent item click
    setSelectedItem(item);
    setEditItemName(item.name);
    setEditItemQuantity(item.quantity);
    setEditItemPrice(item.price);
    setEditItemOrder(item.order);
    setEditShoppingDate(item.shoppingDate || '');
    setShowEditModal(true);
  }

  // HANDLE DELETE ITEM - This runs when user clicks delete button
  function handleDeleteItem(item, event) {
    event.stopPropagation(); // Prevent item click
    if (window.confirm(`${t.deleteConfirm} "${item.name}"?`)) {
      const updatedItems = items.filter(i => i.id !== item.id);
      setItems(updatedItems);
      
      // Save to localStorage
      saveToStorage(STORAGE_KEYS.CURRENT_ITEMS, updatedItems);
      
      console.log('Item deleted:', item);
    }
  }

  // HANDLE ITEM UPDATE - This runs when user saves edited item
  function handleItemUpdate(e) {
    e.preventDefault();
    
    const updatedItem = {
      ...selectedItem,
      name: editItemName,
      quantity: Number(editItemQuantity),
      price: Number(editItemPrice),
      order: Number(editItemOrder),
      shoppingDate: editShoppingDate
    };
    
    // Update the items array
    const updatedItems = items.map(item => 
      item.id === selectedItem.id ? updatedItem : item
    );
    setItems(updatedItems);
    
    // Save to localStorage
    saveToStorage(STORAGE_KEYS.CURRENT_ITEMS, updatedItems);
    
    // Close modal and clear form
    setShowEditModal(false);
    setSelectedItem(null);
    setEditItemName("");
    setEditItemQuantity(0);
    setEditItemPrice(0);
    setEditItemOrder(0);
    setEditShoppingDate("");
    
    console.log('Item updated:', updatedItem);
  }

  // CLOSE EDIT MODAL
  function closeEditModal() {
    setShowEditModal(false);
    setSelectedItem(null);
    setEditItemName("");
    setEditItemQuantity(0);
    setEditItemPrice(0);
    setEditItemOrder(0);
    setEditShoppingDate("");
  }

  // HANDLE STATUS UPDATE - This runs when user changes item status in modal
  function handleStatusUpdate(newStatus) {
    // Update the items array - find the selected item and change its status
    const updatedItems = items.map(item => 
      item.id === selectedItem.id 
        ? { ...item, status: newStatus } // If this is the selected item, update its status
        : item // Otherwise, keep the item unchanged
    );
    setItems(updatedItems);
    
    // Save to localStorage
    saveToStorage(STORAGE_KEYS.CURRENT_ITEMS, updatedItems);
    
    // Close the modal and clear selection
    setShowModal(false);
    setSelectedItem(null);
    
    console.log(`Item "${selectedItem.name}" status changed to: ${newStatus}`);
  }

  // CLOSE MODAL - This runs when user wants to close the modal without updating
  function closeModal() {
    setShowModal(false);
    setSelectedItem(null);
  }

  // TOGGLE DARK MODE
  function toggleDarkMode() {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
  }

  // TOGGLE LANGUAGE
  function toggleLanguage() {
    const newLanguage = language === 'en' ? 'am' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  }

  // NOTIFICATION FUNCTIONS
  // Request permission for notifications
  async function requestNotificationPermission() {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }

  // Schedule market day notifications
  function scheduleMarketDayNotifications() {
    if ('serviceWorker' in navigator && 'Notification' in window && marketDays.length > 0) {
      // Clear existing notifications
      clearDailyNotifications();
      
      // Schedule notifications for each market day at 7 AM
      const scheduleNextNotification = () => {
        const now = new Date();
        const currentDay = now.getDay(); // 0=Sunday, 1=Monday, etc.
        
        // Find next market day
        let nextMarketDay = null;
        let daysUntilNext = 7; // Default to next week if no market day found
        
        // Check remaining days this week
        for (let i = 0; i < 7; i++) {
          const checkDay = (currentDay + i) % 7;
          if (marketDays.includes(checkDay)) {
            if (i === 0) {
              // Today is market day - check if it's before 7 AM
              if (now.getHours() < 7) {
                nextMarketDay = checkDay;
                daysUntilNext = 0;
                break;
              }
            } else {
              nextMarketDay = checkDay;
              daysUntilNext = i;
              break;
            }
          }
        }
        
        if (nextMarketDay !== null) {
          const nextNotification = new Date(now);
          nextNotification.setDate(nextNotification.getDate() + daysUntilNext);
          nextNotification.setHours(7, 0, 0, 0); // 7:00 AM
          
          const timeUntilNext = nextNotification.getTime() - now.getTime();
          
          setTimeout(() => {
            showMarketDayNotification();
            // Schedule next notification
            scheduleNextNotification();
          }, timeUntilNext);
        }
      };
      
      scheduleNextNotification();
      
      // Store notification state
      localStorage.setItem('notificationsEnabled', 'true');
      localStorage.setItem('marketDays', JSON.stringify(marketDays));
    }
  }

  // Clear daily notifications
  function clearDailyNotifications() {
    localStorage.removeItem('notificationsEnabled');
    localStorage.removeItem('marketDays');
  }

  // Show market day notification
  function showMarketDayNotification() {
    if (Notification.permission === 'granted') {
      const plannedItems = items.filter(item => item.status === 'planned').length;
      const body = plannedItems > 0 
        ? `${t.marketDayNotification} You have ${plannedItems} items to buy.`
        : t.marketDayNotification;
        
      new Notification(t.marketDayReminder, {
        body: body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: 'market-day-reminder',
        requireInteraction: false,
        silent: false
      });
    }
  }

  // Toggle notifications
  async function toggleNotifications() {
    if (!notificationsEnabled) {
      if (marketDays.length === 0) {
        alert(t.noMarketDaysSelected);
        setShowSettings(true);
        return;
      }
      
      const granted = await requestNotificationPermission();
      if (granted) {
        setNotificationsEnabled(true);
        scheduleMarketDayNotifications();
      } else {
        alert(t.permissionDenied);
      }
    } else {
      setNotificationsEnabled(false);
      clearDailyNotifications();
    }
  }

  // Handle market days change
  function handleMarketDayToggle(dayIndex) {
    const newMarketDays = marketDays.includes(dayIndex)
      ? marketDays.filter(day => day !== dayIndex)
      : [...marketDays, dayIndex].sort();
    
    setMarketDays(newMarketDays);
  }

  // Save settings
  function saveSettings() {
    localStorage.setItem('marketDays', JSON.stringify(marketDays));
    localStorage.setItem('darkMode', darkMode.toString());
    localStorage.setItem('language', language);
    
    // Reschedule notifications if enabled
    if (notificationsEnabled && marketDays.length > 0) {
      scheduleMarketDayNotifications();
    }
    
    alert(t.marketDaysUpdated);
    setShowSettings(false);
  }

  // WEEKLY REPORT FUNCTIONS
  const handleGenerateWeeklyReport = useCallback(() => {
    const report = saveWeeklyReport(items);
    setWeeklyReports(prev => ({ ...prev, [report.weekKey]: report }));
    // Show a temporary success message instead of alert
    const successMsg = document.createElement('div');
    successMsg.textContent = language === 'en' ? 'Weekly report saved!' : 'ሳምንታዊ ሪፖርት ተቀምጧል!';
    successMsg.style.cssText = `
      position: fixed; top: 20px; right: 20px; z-index: 10000;
      background: #28a745; color: white; padding: 12px 20px;
      border-radius: 8px; font-weight: 600; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    document.body.appendChild(successMsg);
    setTimeout(() => document.body.removeChild(successMsg), 3000);
  }, [items, language]); // Depend on items and language instead of translations object

  const handleViewWeeklyReports = useCallback(() => {
    const reports = getWeeklyReports();
    setWeeklyReports(reports);
    setShowReportsModal(true);
  }, []);

  const handleWeeklyReset = useCallback(() => {
    // Save current week's report before reset
    if (items.length > 0) {
      const report = saveWeeklyReport(items);
      setWeeklyReports(prev => ({ ...prev, [report.weekKey]: report }));
    }
    
    // Clear current items for new week
    setItems([]);
    saveToStorage(STORAGE_KEYS.CURRENT_ITEMS, []);
    
    // Update last reset week
    const newWeekKey = getCurrentWeekKey();
    localStorage.setItem('last_reset_week', newWeekKey);
    setCurrentWeekKey(newWeekKey);
    
    // Close the notification
    setShowWeeklyResetNotification(false);
  }, [items]); // Only depend on items, not translations

  // Load settings on app start
  useEffect(() => {
    // Set current week key
    const weekKey = getCurrentWeekKey();
    setCurrentWeekKey(weekKey);
    
    // Load items from localStorage
    const savedItems = loadFromStorage(STORAGE_KEYS.CURRENT_ITEMS, []);
    if (savedItems.length > 0) {
      setItems(savedItems);
    }
    
    // Load weekly reports
    const reports = getWeeklyReports();
    setWeeklyReports(reports);
    
    // Load notification settings
    const savedNotificationState = localStorage.getItem('notificationsEnabled');
    if (savedNotificationState === 'true') {
      setNotificationsEnabled(true);
    }
    
    // Load market days
    const savedMarketDays = localStorage.getItem('marketDays');
    if (savedMarketDays) {
      setMarketDays(JSON.parse(savedMarketDays));
    }
    
    // Load theme preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      setDarkMode(true);
    }
    
    // Load language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
    
    // Check if we need to reset for new week (simplified)
    const lastResetWeek = localStorage.getItem('last_reset_week');
    if (lastResetWeek !== weekKey && savedItems.length > 0) {
      // Show weekly reset notification after a delay
      const timer = setTimeout(() => {
        setShowWeeklyResetNotification(true);
      }, 2000);
      
      // Cleanup function to clear timeout if component unmounts
      return () => clearTimeout(timer);
    }
  }, []); // Empty dependency array - only run once on mount

  // Close top menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (showTopMenu && !event.target.closest('.header-menu')) {
        setShowTopMenu(false);
      }
    }

    if (showTopMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showTopMenu]);

  // SORT ITEMS BY ORDER (PRIORITY) - Lower numbers = higher priority
  // Example: order 1 comes before order 2, order 2 before order 3, etc.
  const sortedItems = [...items].sort((a, b) => a.order - b.order);

  return(
    <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* HEADER WITH CONTROLS */}
      <div className="app-header">
        <div className="header-content">
          <div className="title-section">
            <h1 className="app-title">{t.title}</h1>
            <p className="app-subtitle">{t.subtitle}</p>
          </div>
          
          <div className="header-menu">
            <button 
              className="menu-toggle-btn"
              onClick={() => setShowTopMenu(!showTopMenu)}
            >
              <div className="hamburger-icon">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
            
            {showTopMenu && (
              <div className="top-menu-dropdown">
                {/* App Settings Section */}
                <div className="menu-section">
                  <div className="menu-section-title">{t.appSettings}</div>
                  
                  <button 
                    className="menu-item"
                    onClick={() => {
                      toggleLanguage();
                      setShowTopMenu(false);
                    }}
                  >
                    🌐 {t.language}: {language === 'en' ? 'English' : 'አማርኛ'}
                  </button>
                  
                  <button 
                    className="menu-item"
                    onClick={() => {
                      toggleDarkMode();
                      setShowTopMenu(false);
                    }}
                  >
                    {darkMode ? '☀️' : '🌙'} {darkMode ? t.lightMode : t.darkMode}
                  </button>
                </div>

                {/* Notifications Section */}
                <div className="menu-section">
                  <div className="menu-section-title">{t.notifications}</div>
                  
                  <button 
                    className={`menu-item notification-toggle ${notificationsEnabled ? 'active' : ''}`}
                    onClick={() => {
                      toggleNotifications();
                      setShowTopMenu(false);
                    }}
                  >
                    <div className="notification-status-container">
                      <span className="notification-icon">
                        {notificationsEnabled ? '🔔' : '🔕'}
                      </span>
                      <div className="notification-text">
                        <div className="notification-title">{t.marketDayReminders}</div>
                        <div className="notification-subtitle">
                          {notificationsEnabled ? t.reminderOn : t.reminderOff}
                        </div>
                      </div>
                      <div className={`toggle-switch ${notificationsEnabled ? 'on' : 'off'}`}>
                        <div className="toggle-slider"></div>
                      </div>
                    </div>
                  </button>
                  
                  <button 
                    className="menu-item"
                    onClick={() => {
                      setShowSettings(true);
                      setShowTopMenu(false);
                    }}
                  >
                    ⚙️ {t.settings}
                  </button>
                  
                  <button 
                    className="menu-item"
                    onClick={() => {
                      handleViewWeeklyReports();
                      setShowTopMenu(false);
                    }}
                  >
                    📊 {t.viewReports}
                  </button>
                  
                  <button 
                    className="menu-item"
                    onClick={() => {
                      handleGenerateWeeklyReport();
                      setShowTopMenu(false);
                    }}
                  >
                    💾 {t.weeklyReport}
                  </button>
                </div>

                {/* About Section */}
                <div className="menu-section">
                  <div className="menu-section-title">{t.about}</div>
                  
                  <button 
                    className="menu-item"
                    onClick={() => {
                      setShowAboutModal(true);
                      setShowTopMenu(false);
                    }}
                  >
                    ℹ️ {t.aboutUs}
                  </button>
                  
                  <button 
                    className="menu-item"
                    onClick={() => {
                      window.open('mailto:suleymanabdu09@gmail.com?subject=Ethiopian Shopping List App - Feedback', '_blank');
                      setShowTopMenu(false);
                    }}
                  >
                    📧 {t.contactUs}
                  </button>
                  
                  <button 
                    className="menu-item"
                    onClick={() => {
                      setShowHelpModal(true);
                      setShowTopMenu(false);
                    }}
                  >
                    ❓ {t.help}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="main-content">
        {/* SHOPPING LIST */}
        <ShopingList 
          items={sortedItems} 
          onItemClick={handleItemClick}
          onEditItem={handleEditItem}
          onDeleteItem={handleDeleteItem}
          translations={t}
        /> 
        
        <div className="sidebar">
          {/* ADD ITEM BUTTON */}
          <div className="add-item-section">
            <button 
              className={`toggle-form-button ${showForm ? 'active' : ''}`}
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? t.hideForm : t.showForm}
            </button>
          </div>
          
          {/* COLLAPSIBLE FORM */}
          <div className={`form-container ${showForm ? 'show' : 'hide'}`}>
            <ShopingForm 
              handleSubmit={handleSubmit}
              itemName={itemName}
              itemQuantity={itemQuantity}
              itemPrice={itemPrice}
              itemOrder={itemOrder}
              shoppingDate={shoppingDate}
              setItemName={setItemName}
              setItemQuantity={setItemQuantity}
              setItemPrice={setItemPrice}
              setItemOrder={setItemOrder}
              setShoppingDate={setShoppingDate}
              translations={t}
            />
          </div>
          
          {/* CALCULATION SUMMARY */}
          <ShopingCalculation items={items} translations={t}/>
        </div>
      </div>
      
      {/* CONDITIONAL RENDERING - Only show modal if showModal is true */}
      {showModal && (
        <StatusUpdateModal 
          item={selectedItem}
          onStatusUpdate={handleStatusUpdate}
          onClose={closeModal}
          translations={t}
        />
      )}
      
      {/* EDIT ITEM MODAL */}
      {showEditModal && (
        <EditItemModal 
          item={selectedItem}
          itemName={editItemName}
          itemQuantity={editItemQuantity}
          itemPrice={editItemPrice}
          itemOrder={editItemOrder}
          shoppingDate={editShoppingDate}
          setItemName={setEditItemName}
          setItemQuantity={setEditItemQuantity}
          setItemPrice={setEditItemPrice}
          setItemOrder={setEditItemOrder}
          setShoppingDate={setEditShoppingDate}
          onUpdate={handleItemUpdate}
          onClose={closeEditModal}
          translations={t}
        />
      )}
      
      {/* CONDITIONAL RENDERING - Only show modal if showModal is true */}
      {showModal && (
        <StatusUpdateModal 
          item={selectedItem}
          onStatusUpdate={handleStatusUpdate}
          onClose={closeModal}
          translations={t}
        />
      )}
      
      {/* EDIT ITEM MODAL */}
      {showEditModal && (
        <EditItemModal 
          item={selectedItem}
          itemName={editItemName}
          itemQuantity={editItemQuantity}
          itemPrice={editItemPrice}
          itemOrder={editItemOrder}
          shoppingDate={editShoppingDate}
          setItemName={setEditItemName}
          setItemQuantity={setEditItemQuantity}
          setItemPrice={setEditItemPrice}
          setItemOrder={setEditItemOrder}
          setShoppingDate={setEditShoppingDate}
          onUpdate={handleItemUpdate}
          onClose={closeEditModal}
          translations={t}
        />
      )}
      
      {/* SETTINGS MODAL */}
      {showSettings && (
        <SettingsModal 
          darkMode={darkMode}
          language={language}
          marketDays={marketDays}
          notificationsEnabled={notificationsEnabled}
          onMarketDayToggle={handleMarketDayToggle}
          onSave={saveSettings}
          onClose={() => setShowSettings(false)}
          translations={t}
        />
      )}
      
      {/* WEEKLY REPORTS MODAL */}
      {showReportsModal && (
        <WeeklyReportsModal 
          reports={weeklyReports}
          currentWeekKey={currentWeekKey}
          onClose={() => setShowReportsModal(false)}
          onWeeklyReset={handleWeeklyReset}
          translations={t}
        />
      )}
      
      {/* ABOUT US MODAL */}
      {showAboutModal && (
        <AboutUsModal 
          onClose={() => setShowAboutModal(false)}
          translations={t}
        />
      )}
      
      {/* HELP MODAL */}
      {showHelpModal && (
        <HelpModal 
          onClose={() => setShowHelpModal(false)}
          translations={t}
          language={language}
        />
      )}
      
      {/* WEEKLY RESET NOTIFICATION MODAL */}
      {showWeeklyResetNotification && (
        <WeeklyResetNotificationModal 
          onReset={handleWeeklyReset}
          onClose={() => setShowWeeklyResetNotification(false)}
          onViewReports={handleViewWeeklyReports}
          translations={t}
        />
      )}
    </div>
  )
}
function ShopingList({ items, onItemClick, onEditItem, onDeleteItem, translations }) {
  return (
    <div className="shopping-list">
      <h2 className="list-header">{translations.yourItems}</h2>
      <div className="shopping-items">
        {items.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🛒</div>
            <h3 className="empty-state-title">{translations.emptyStateTitle}</h3>
            <p className="empty-state-message">
              {translations.emptyStateMessage}
            </p>
          </div>
        ) : (
          items.map((item) => (
            <ShopingItem 
              key={item.id} 
              item={item} 
              onItemClick={onItemClick}
              onEditItem={onEditItem}
              onDeleteItem={onDeleteItem}
              translations={translations}
            />
          ))
        )}
      </div>
    </div>
  );
}
function ShopingItem({item, onItemClick, onEditItem, onDeleteItem, translations}) {
  // Format the shopping date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Get relative date text
  const getRelativeDateText = (dateString) => {
    if (!dateString) return '';
    
    const selectedDate = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Reset time for comparison
    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    
    if (selectedDate.getTime() === today.getTime()) {
      return translations.today;
    } else if (selectedDate.getTime() === tomorrow.getTime()) {
      return translations.tomorrow;
    } else if (selectedDate.getTime() < today.getTime() + 7 * 24 * 60 * 60 * 1000) {
      return translations.thisWeek;
    } else {
      return translations.nextWeek;
    }
  };

  return (
    <div className={`shopping-item ${item.status}`}>
      {/* Main item content - clickable for status change */}
      <div className="item-content" onClick={() => onItemClick(item)}>
        <div className="item-header">
          <h3 className="item-name">
            {item.name}
            <span className="priority-badge">{translations.priority} #{item.order}</span>
          </h3>
          <div className="item-status-section">
            <span className={`item-status status-${item.status}`}>
              {translations[item.status]}
            </span>
            {item.shoppingDate && (
              <span className="shopping-date-badge">
                📅 {getRelativeDateText(item.shoppingDate)}
              </span>
            )}
          </div>
        </div>
        
        <div className="item-details">
          <div className="item-detail">
            <div className="detail-label">{translations.quantity}</div>
            <div className="detail-value">{item.quantity}</div>
          </div>
          <div className="item-detail">
            <div className="detail-label">{translations.price.replace(' ($)', '').replace(' (ብር)', '')}</div>
            <div className="detail-value price-value">{item.price} ብር</div>
          </div>
          <div className="item-detail">
            <div className="detail-label">{translations.totalCost}</div>
            <div className="detail-value price-value">{item.price * item.quantity} ብር</div>
          </div>
        </div>
        
        {item.shoppingDate && (
          <div className="shopping-date-info">
            {translations.scheduleFor}: {formatDate(item.shoppingDate)}
          </div>
        )}
        
        <div className="click-hint">{translations.clickToUpdate}</div>
      </div>
      
      {/* Action buttons on the right */}
      <div className="item-actions-right">
        <button 
          className="action-btn edit-btn"
          onClick={(e) => {
            e.stopPropagation();
            onEditItem(item, e);
          }}
          title={translations.editItem}
        >
          <span className="btn-icon">✏️</span>
          <span className="btn-label">{translations.update}</span>
        </button>
        
        <button 
          className="action-btn delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteItem(item, e);
          }}
          title={translations.deleteItem}
        >
          <span className="btn-icon">🗑️</span>
          <span className="btn-label">{translations.delete}</span>
        </button>
      </div>
    </div>
  );
}
function ShopingForm({ 
  handleSubmit,
  itemName,
  itemQuantity,
  itemPrice,
  itemOrder,
  shoppingDate,
  setItemName,
  setItemQuantity,
  setItemPrice,
  setItemOrder,
  setShoppingDate,
  translations
}) {
  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];
  
  return(  
    <div className="shopping-form">
      <h2 className="form-header">{translations.addNewItem}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">{translations.itemName}</label>
          <input 
            className="form-input" 
            type="text" 
            placeholder={translations.itemName}
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">{translations.quantity}</label>
          <input 
            className="form-input" 
            type="number" 
            placeholder={translations.quantity}
            value={itemQuantity}
            onChange={(e) => setItemQuantity(e.target.value)}
            min="1"
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">{translations.price}</label>
          <input 
            className="form-input" 
            type="number" 
            placeholder={translations.price}
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
            min="0"
            step="0.01"
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">{translations.priorityOrder}</label>
          <input 
            className="form-input" 
            type="number" 
            placeholder="1 = highest priority"
            value={itemOrder}
            onChange={(e) => setItemOrder(e.target.value)}
            min="1"
            required
          />
          <small className="form-help">
            {translations.priorityHelp}
          </small>
        </div>
        
        <div className="form-group">
          <label className="form-label">{translations.shoppingDate}</label>
          <input 
            className="form-input date-input" 
            type="date" 
            value={shoppingDate}
            onChange={(e) => setShoppingDate(e.target.value)}
            min={today}
            required
          />
          <small className="form-help">
            {translations.shoppingDateHelp}
          </small>
        </div>
        
        <button type="submit" className="form-button">
          {translations.addItemButton}
        </button>
      </form>
    </div>
  )
}
function ShopingCalculation({ items, translations }) {
  // Calculate total price of all items
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Calculate total cost for bought items only
  const boughtItemsTotal = items
    .filter(item => item.status === 'bought')
    .reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Count items
  const totalItems = items.length;
  const boughtItems = items.filter(item => item.status === 'bought').length;
  const plannedItems = items.filter(item => item.status === 'planned').length;

  return (
    <div className="shopping-calculation">
      <h2 className="calculation-header">{translations.shoppingSummary}</h2>
      
      <div className="calculation-stats">
        <div className="stat-card total">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <div className="stat-label">{translations.totalBudget}</div>
            <div className="stat-value">{totalPrice} ብር</div>
            <div className="stat-subtitle">{totalItems} {translations.items}</div>
          </div>
        </div>

        <div className="stat-card bought">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-label">{translations.alreadySpent}</div>
            <div className="stat-value">{boughtItemsTotal} ብር</div>
            <div className="stat-subtitle">{boughtItems} {translations.itemsBought}</div>
          </div>
        </div>

        <div className="stat-card remaining">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <div className="stat-label">{translations.stillToBuy}</div>
            <div className="stat-value">{totalPrice - boughtItemsTotal} ብር</div>
            <div className="stat-subtitle">{plannedItems} {translations.itemsPlanned}</div>
          </div>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-label">
          {translations.shoppingProgress}: {boughtItems}/{totalItems} {translations.items}
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${totalItems > 0 ? (boughtItems / totalItems) * 100 : 0}%` }}
          ></div>
        </div>
        <div className="progress-percentage">
          {totalItems > 0 ? Math.round((boughtItems / totalItems) * 100) : 0}% {translations.complete}
        </div>
      </div>
    </div>
  );
}

function StatusUpdateModal({ item, onStatusUpdate, onClose, translations }) {
  if (!item) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{translations.updateStatusFor} "{item.name}"</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <p className="modal-description">
            {translations.currentStatus}: <span className={`current-status status-${item.status}`}>
              {translations[item.status]}
            </span>
          </p>
          
          <div className="status-options">
            <button 
              className={`status-button planned ${item.status === 'planned' ? 'active' : ''}`}
              onClick={() => {
                onStatusUpdate('planned');
              }}
            >
              📝 {translations.planned}
            </button>
            
            <button 
              className={`status-button bought ${item.status === 'bought' ? 'active' : ''}`}
              onClick={() => {
                onStatusUpdate('bought');
              }}
            >
              ✅ {translations.bought}
            </button>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>
            {translations.cancel}
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingsModal({ 
  darkMode, 
  language, 
  marketDays, 
  notificationsEnabled, 
  onMarketDayToggle, 
  onSave, 
  onClose, 
  translations 
}) {
  const dayNames = [
    translations.sunday,
    translations.monday,
    translations.tuesday,
    translations.wednesday,
    translations.thursday,
    translations.friday,
    translations.saturday
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>⚙️ {translations.settings}</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body settings-body">
          {/* Market Days Section */}
          <div className="settings-section">
            <h4 className="settings-section-title">🏪 {translations.marketDays}</h4>
            <p className="settings-help">{translations.marketDaysHelp}</p>
            
            <div className="market-days-grid">
              {dayNames.map((dayName, index) => (
                <label key={index} className="market-day-item">
                  <input
                    type="checkbox"
                    checked={marketDays.includes(index)}
                    onChange={() => onMarketDayToggle(index)}
                    className="market-day-checkbox"
                  />
                  <span className="market-day-label">{dayName}</span>
                </label>
              ))}
            </div>
            
            {marketDays.length > 0 && (
              <div className="selected-days-info">
                <strong>Selected days:</strong> {marketDays.map(day => dayNames[day]).join(', ')}
              </div>
            )}
          </div>

          {/* Notification Status */}
          <div className="settings-section">
            <h4 className="settings-section-title">🔔 Notifications</h4>
            <div className="notification-status">
              <span className={`status-indicator ${notificationsEnabled ? 'enabled' : 'disabled'}`}>
                {notificationsEnabled ? translations.notificationsEnabled : translations.notificationsDisabled}
              </span>
            </div>
          </div>

          {/* About Section */}
          <div className="settings-section">
            <h4 className="settings-section-title">ℹ️ {translations.aboutApp}</h4>
            
            <div className="about-info">
              <div className="about-item">
                <strong>{translations.version}:</strong> 1.0.0
              </div>
              
              <div className="about-item">
                <strong>{translations.developer}:</strong> Suleyman Abdu & Tesnim
              </div>
              
              <div className="about-item">
                <strong>{translations.contact}:</strong> 
                <a href="mailto:suleymanabdu09@gmail.com" className="contact-link">
                  suleymanabdu09@gmail.com
                </a>
              </div>
              
              <div className="about-description">
                <p>Ethiopian Shopping List App - A modern, bilingual shopping list with market day notifications designed specifically for Ethiopian users.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="save-button" onClick={onSave}>
            💾 {translations.saveSettings}
          </button>
          <button className="cancel-button" onClick={onClose}>
            {translations.cancel}
          </button>
        </div>
      </div>
    </div>
  );
}
function EditItemModal({ 
  item,
  itemName,
  itemQuantity,
  itemPrice,
  itemOrder,
  shoppingDate,
  setItemName,
  setItemQuantity,
  setItemPrice,
  setItemOrder,
  setShoppingDate,
  onUpdate,
  onClose,
  translations 
}) {
  if (!item) return null;

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content edit-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>✏️ {translations.editItem}: "{item.name}"</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <form onSubmit={onUpdate} className="edit-form">
            <div className="form-group">
              <label className="form-label">{translations.itemName}</label>
              <input 
                className="form-input" 
                type="text" 
                placeholder={translations.itemName}
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">{translations.quantity}</label>
                <input 
                  className="form-input" 
                  type="number" 
                  placeholder={translations.quantity}
                  value={itemQuantity}
                  onChange={(e) => setItemQuantity(e.target.value)}
                  min="1"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">{translations.price}</label>
                <input 
                  className="form-input" 
                  type="number" 
                  placeholder={translations.price}
                  value={itemPrice}
                  onChange={(e) => setItemPrice(e.target.value)}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">{translations.priorityOrder}</label>
                <input 
                  className="form-input" 
                  type="number" 
                  placeholder="1 = highest priority"
                  value={itemOrder}
                  onChange={(e) => setItemOrder(e.target.value)}
                  min="1"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">{translations.shoppingDate}</label>
                <input 
                  className="form-input date-input" 
                  type="date" 
                  value={shoppingDate}
                  onChange={(e) => setShoppingDate(e.target.value)}
                  min={today}
                />
              </div>
            </div>
            
            <div className="current-status-info">
              <span className="status-label">Current Status:</span>
              <span className={`current-status status-${item.status}`}>
                {translations[item.status]}
              </span>
            </div>
          </form>
        </div>
        
        <div className="modal-footer">
          <button className="update-button" onClick={onUpdate}>
            💾 {translations.updateItem}
          </button>
          <button className="cancel-button" onClick={onClose}>
            {translations.cancel}
          </button>
        </div>
      </div>
    </div>
  );
}

function WeeklyReportsModal({ reports, currentWeekKey, onClose, onWeeklyReset, translations }) {
  const [selectedWeek, setSelectedWeek] = useState(currentWeekKey);
  
  const reportKeys = Object.keys(reports).sort().reverse(); // Most recent first
  const selectedReport = reports[selectedWeek];
  
  const formatWeekDate = (weekKey) => {
    const date = new Date(weekKey);
    const endDate = new Date(date);
    endDate.setDate(date.getDate() + 6);
    
    return `${date.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content reports-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>📊 {translations.weeklyReports}</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body reports-body">
          {reportKeys.length === 0 ? (
            <div className="no-reports">
              <div className="no-reports-icon">📊</div>
              <h4>{translations.noReportsYet}</h4>
              <p>Start shopping and generate your first weekly report!</p>
            </div>
          ) : (
            <>
              {/* Week Selector */}
              <div className="week-selector">
                <label className="form-label">{translations.selectWeek}:</label>
                <select 
                  className="form-select"
                  value={selectedWeek}
                  onChange={(e) => setSelectedWeek(e.target.value)}
                >
                  {reportKeys.map(weekKey => (
                    <option key={weekKey} value={weekKey}>
                      {weekKey === currentWeekKey ? translations.currentWeek : translations.weekOf} {formatWeekDate(weekKey)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Report Details */}
              {selectedReport && (
                <div className="report-details">
                  <h4 className="report-title">
                    {translations.reportDetails} - {formatWeekDate(selectedReport.weekKey)}
                  </h4>
                  
                  <div className="report-stats">
                    <div className="report-stat-card">
                      <div className="stat-icon">📝</div>
                      <div className="stat-content">
                        <div className="stat-label">{translations.totalItems}</div>
                        <div className="stat-value">{selectedReport.totalItems}</div>
                      </div>
                    </div>
                    
                    <div className="report-stat-card">
                      <div className="stat-icon">✅</div>
                      <div className="stat-content">
                        <div className="stat-label">{translations.itemsBought}</div>
                        <div className="stat-value">{selectedReport.boughtItems}</div>
                      </div>
                    </div>
                    
                    <div className="report-stat-card">
                      <div className="stat-icon">💰</div>
                      <div className="stat-content">
                        <div className="stat-label">{translations.totalSpent}</div>
                        <div className="stat-value">{selectedReport.totalSpent} ብር</div>
                      </div>
                    </div>
                    
                    <div className="report-stat-card">
                      <div className="stat-icon">📊</div>
                      <div className="stat-content">
                        <div className="stat-label">{translations.completionRate}</div>
                        <div className="stat-value">{selectedReport.completionRate}%</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Items List */}
                  <div className="report-items">
                    <h5>Items in this week:</h5>
                    <div className="report-items-list">
                      {selectedReport.items.map(item => (
                        <div key={item.id} className={`report-item ${item.status}`}>
                          <span className="item-name">{item.name}</span>
                          <span className="item-details">
                            {item.quantity} × {item.price} ብር = {item.totalCost} ብር
                          </span>
                          <span className={`item-status status-${item.status}`}>
                            {translations[item.status]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        
        <div className="modal-footer">
          {reportKeys.length > 0 && (
            <button className="reset-button" onClick={onWeeklyReset}>
              🔄 Start New Week
            </button>
          )}
          <button className="cancel-button" onClick={onClose}>
            {translations.cancel}
          </button>
        </div>
      </div>
    </div>
  );
}
function AboutUsModal({ onClose, translations }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content about-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>ℹ️ {translations.aboutUs}</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body about-body">
          {/* App Info Section */}
          <div className="app-info-section">
            <div className="app-logo">🛒</div>
            <h4 className="app-name">Ethiopian Shopping List</h4>
            <p className="app-description">
              {translations.language === 'en' 
                ? "A modern, bilingual shopping list app designed specifically for Ethiopian users with market day notifications and Ethiopian Birr currency support."
                : "ለኢትዮጵያዊ ተጠቃሚዎች በተለይ የተነደፈ ዘመናዊ፣ ባለሁለት ቋንቋ የግዢ ዝርዝር መተግበሪያ የገበያ ቀን ማሳወቂያዎች እና የኢትዮጵያ ብር ምንዛሪ ድጋፍ ያለው።"
              }
            </p>
            <div className="version-info">
              <span className="version-label">{translations.version}:</span>
              <span className="version-number">1.0.0</span>
            </div>
          </div>

          {/* Developers Section */}
          <div className="developers-section">
            <h5 className="developers-title">{translations.developer}s:</h5>
            
            <div className="developers-grid">
              <div className="developer-card">
                <div className="developer-photo">
                  <img 
                    src="/suleyman2.png" 
                    alt="Suleyman Abdu"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="photo-placeholder" style={{display: 'none'}}>
                    👨‍💻
                  </div>
                </div>
                <div className="developer-info">
                  <h6 className="developer-name">Suleyman Abdu</h6>
                  <p className="developer-role">Lead Developer</p>
                  <a 
                    href="mailto:suleymanabdu09@gmail.com" 
                    className="developer-contact"
                  >
                    📧 suleymanabdu09@gmail.com
                  </a>
                </div>
              </div>

              <div className="developer-card">
                <div className="developer-photo">
                  <img 
                    src="/tesnim3.png" 
                    alt="Tesnim"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="photo-placeholder" style={{display: 'none'}}>
                    👩‍💻
                  </div>
                </div>
                <div className="developer-info">
                  <h6 className="developer-name">Tesnim Nuru</h6>
                  <p className="developer-role">Co-Developer</p>
                  <p className="developer-contact">
                    🤝 Collaboration Partner
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="features-section">
            <h5 className="features-title">
              {translations.language === 'en' ? 'Key Features:' : 'ዋና ባህሪያት:'}
            </h5>
            <ul className="features-list">
              <li>🌐 {translations.language === 'en' ? 'Bilingual Support (English & Amharic)' : 'ባለሁለት ቋንቋ ድጋፍ (እንግሊዝኛ እና አማርኛ)'}</li>
              <li>🏪 {translations.language === 'en' ? 'Ethiopian Market Day Notifications' : 'የኢትዮጵያ የገበያ ቀን ማሳወቂያዎች'}</li>
              <li>💰 {translations.language === 'en' ? 'Ethiopian Birr Currency Support' : 'የኢትዮጵያ ብር ምንዛሪ ድጋፍ'}</li>
              <li>📱 {translations.language === 'en' ? 'Mobile-First Responsive Design' : 'ሞባይል-መጀመሪያ ምላሽ ሰጪ ዲዛይን'}</li>
              <li>🌙 {translations.language === 'en' ? 'Dark & Light Mode' : 'ጨለማ እና ብርሃን ሁነታ'}</li>
              <li>📊 {translations.language === 'en' ? 'Weekly Shopping Reports' : 'ሳምንታዊ የግዢ ሪፖርቶች'}</li>
              <li>🔔 {translations.language === 'en' ? 'Smart Reminder System' : 'ብልህ ማስታወሻ ስርዓት'}</li>
              <li>💾 {translations.language === 'en' ? 'Data Persistence' : 'የመረጃ ቋሚነት'}</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="contact-section">
            <h5 className="contact-title">{translations.contactUs}:</h5>
            <div className="contact-info">
              <a 
                href="mailto:suleymanabdu09@gmail.com?subject=Ethiopian Shopping List App - Feedback"
                className="contact-link"
              >
                📧 suleymanabdu09@gmail.com
              </a>
              <p className="contact-note">
                {translations.language === 'en' 
                  ? 'We welcome your feedback and suggestions!'
                  : 'የእርስዎን አስተያየት እና ሀሳቦች እንቀበላለን!'
                }
              </p>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>
            {translations.cancel}
          </button>
        </div>
      </div>
    </div>
  );
}
function HelpModal({ onClose, translations, language }) {
  const helpSteps = language === 'en' ? [
    {
      icon: "➕",
      title: "Add Items",
      description: "Click '+ Add New Item to Buy' to add items to your shopping list"
    },
    {
      icon: "🔢",
      title: "Set Priority",
      description: "Set priority numbers (1 = highest priority). Lower numbers appear first"
    },
    {
      icon: "📅",
      title: "Choose Date",
      description: "Select when you plan to shop for each item"
    },
    {
      icon: "👆",
      title: "Update Status",
      description: "Click on items to change status from 'Planned' to 'Bought'"
    },
    {
      icon: "✏️",
      title: "Edit Items",
      description: "Use the edit button (✏️) to modify item details"
    },
    {
      icon: "🗑️",
      title: "Delete Items",
      description: "Use the delete button (🗑️) to remove items"
    },
    {
      icon: "🏪",
      title: "Market Days",
      description: "Set your local market days in Settings for automatic reminders"
    },
    {
      icon: "📊",
      title: "Weekly Reports",
      description: "Generate and view weekly shopping reports to track your progress"
    }
  ] : [
    {
      icon: "➕",
      title: "እቃዎችን ያክሉ",
      description: "እቃዎችን ወደ የግዢ ዝርዝርዎ ለመጨመር '+ አዲስ እቃ ያክሉ' ይጫኑ"
    },
    {
      icon: "🔢",
      title: "ቅድሚያ ያስቀምጡ",
      description: "የቅድሚያ ቁጥሮችን ያስቀምጡ (1 = ከፍተኛ ቅድሚያ)። ዝቅተኛ ቁጥሮች በመጀመሪያ ይታያሉ"
    },
    {
      icon: "📅",
      title: "ቀን ይምረጡ",
      description: "ለእያንዳንዱ እቃ መቼ ለመግዛት እንደሚያቅዱ ይምረጡ"
    },
    {
      icon: "👆",
      title: "ሁኔታን ያዘምኑ",
      description: "ሁኔታን ከ'የታቀደ' ወደ 'የተገዛ' ለመቀየር እቃዎችን ይጫኑ"
    },
    {
      icon: "✏️",
      title: "እቃዎችን ያርሙ",
      description: "የእቃ ዝርዝሮችን ለመቀየር የማርሚያ ቁልፍን (✏️) ይጠቀሙ"
    },
    {
      icon: "🗑️",
      title: "እቃዎችን ይሰርዙ",
      description: "እቃዎችን ለማስወገድ የመሰረዣ ቁልፍን (🗑️) ይጠቀሙ"
    },
    {
      icon: "🏪",
      title: "የገበያ ቀናት",
      description: "ለአውቶማቲክ ማስታወሻዎች በቅንብሮች ውስጥ የአካባቢዎን የገበያ ቀናት ያስቀምጡ"
    },
    {
      icon: "📊",
      title: "ሳምንታዊ ሪፖርቶች",
      description: "እድገትዎን ለመከታተል ሳምንታዊ የግዢ ሪፖርቶችን ይፍጠሩ እና ይመልከቱ"
    }
  ];

  const tips = language === 'en' ? [
    "💡 Lower priority numbers appear first in your list",
    "🔔 Enable notifications to get reminders on your market days",
    "📱 The app works offline - your data is saved locally",
    "🌙 Switch between dark and light modes for comfortable viewing",
    "📊 Generate weekly reports to track your shopping habits",
    "💰 All prices are in Ethiopian Birr (ብር)"
  ] : [
    "💡 ዝቅተኛ የቅድሚያ ቁጥሮች በዝርዝርዎ ውስጥ በመጀመሪያ ይታያሉ",
    "🔔 በገበያ ቀናትዎ ማስታወሻዎችን ለማግኘት ማሳወቂያዎችን ያንቁ",
    "📱 መተግበሪያው ከመስመር ውጭ ይሰራል - የእርስዎ መረጃ በአካባቢው ይቀመጣል",
    "🌙 ለምቹ እይታ በጨለማ እና በብርሃን ሁነታዎች መካከል ይቀይሩ",
    "📊 የግዢ ልማዶችዎን ለመከታተል ሳምንታዊ ሪፖርቶችን ይፍጠሩ",
    "💰 ሁሉም ዋጋዎች በኢትዮጵያ ብር (ብር) ናቸው"
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content help-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>❓ {translations.help}</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body help-body">
          {/* How to Use Section */}
          <div className="help-section">
            <h4 className="help-section-title">
              {language === 'en' ? 'How to Use:' : 'እንዴት መጠቀም:'}
            </h4>
            
            <div className="help-steps">
              {helpSteps.map((step, index) => (
                <div key={index} className="help-step">
                  <div className="step-icon">{step.icon}</div>
                  <div className="step-content">
                    <h6 className="step-title">{step.title}</h6>
                    <p className="step-description">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips Section */}
          <div className="help-section">
            <h4 className="help-section-title">
              {language === 'en' ? 'Tips & Tricks:' : 'ምክሮች እና ዘዴዎች:'}
            </h4>
            
            <div className="help-tips">
              {tips.map((tip, index) => (
                <div key={index} className="help-tip">
                  {tip}
                </div>
              ))}
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="help-section">
            <h4 className="help-section-title">
              {language === 'en' ? 'Quick Actions:' : 'ፈጣን እርምጃዎች:'}
            </h4>
            
            <div className="quick-actions">
              <div className="quick-action">
                <span className="action-key">📱</span>
                <span className="action-desc">
                  {language === 'en' ? 'Tap items to change status' : 'ሁኔታን ለመቀየር እቃዎችን ይንኩ'}
                </span>
              </div>
              <div className="quick-action">
                <span className="action-key">✏️</span>
                <span className="action-desc">
                  {language === 'en' ? 'Edit button to modify items' : 'እቃዎችን ለመቀየር የማርሚያ ቁልፍ'}
                </span>
              </div>
              <div className="quick-action">
                <span className="action-key">🗑️</span>
                <span className="action-desc">
                  {language === 'en' ? 'Delete button to remove items' : 'እቃዎችን ለማስወገድ የመሰረዣ ቁልፍ'}
                </span>
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div className="help-section">
            <h4 className="help-section-title">
              {language === 'en' ? 'Need More Help?' : 'ተጨማሪ እርዳታ ይፈልጋሉ?'}
            </h4>
            
            <div className="support-info">
              <p>
                {language === 'en' 
                  ? 'If you have questions or need assistance, feel free to contact us:'
                  : 'ጥያቄዎች ካሉዎት ወይም እርዳታ ከፈለጉ፣ እኛን ለማግኘት ነፃነት ይሰማዎ:'
                }
              </p>
              <a 
                href="mailto:suleymanabdu09@gmail.com?subject=Ethiopian Shopping List App - Help Request"
                className="support-link"
              >
                📧 suleymanabdu09@gmail.com
              </a>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>
            {translations.cancel}
          </button>
        </div>
      </div>
    </div>
  );
}
function WeeklyResetNotificationModal({ onReset, onClose, onViewReports, translations }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content weekly-reset-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>🗓️ {translations.newWeekStarted || 'New Week Started!'}</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="reset-notification-content">
            <div className="notification-icon">📅</div>
            <h4 className="notification-title">
              {translations.language === 'en' 
                ? 'A new week has started!' 
                : 'አዲስ ሳምንት ተጀምሯል!'
              }
            </h4>
            <p className="notification-message">
              {translations.language === 'en' 
                ? 'Your previous shopping items have been automatically archived. You can view them in the weekly reports or start fresh with a new shopping list.'
                : 'ያለፉት የግዢ እቃዎችዎ በራስ-ሰር ተቀምጠዋል። በሳምንታዊ ሪፖርቶች ውስጥ ማየት ወይም በአዲስ የግዢ ዝርዝር መጀመር ይችላሉ።'
              }
            </p>
            
            <div className="notification-options">
              <div className="option-card">
                <div className="option-icon">🔄</div>
                <div className="option-content">
                  <h6 className="option-title">
                    {translations.language === 'en' ? 'Start Fresh' : 'አዲስ ጀምር'}
                  </h6>
                  <p className="option-desc">
                    {translations.language === 'en' 
                      ? 'Clear the list and start with new items for this week'
                      : 'ዝርዝሩን ያጽዱ እና ለዚህ ሳምንት በአዲስ እቃዎች ይጀምሩ'
                    }
                  </p>
                </div>
              </div>
              
              <div className="option-card">
                <div className="option-icon">📊</div>
                <div className="option-content">
                  <h6 className="option-title">
                    {translations.language === 'en' ? 'View Reports' : 'ሪፖርቶችን ይመልከቱ'}
                  </h6>
                  <p className="option-desc">
                    {translations.language === 'en' 
                      ? 'Check your previous week\'s shopping summary'
                      : 'የያለፈው ሳምንት የግዢ ማጠቃለያዎን ይመልከቱ'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="primary-button" onClick={onReset}>
            🔄 {translations.language === 'en' ? 'Start New Week' : 'አዲስ ሳምንት ጀምር'}
          </button>
          <button className="secondary-button" onClick={() => { onViewReports(); onClose(); }}>
            📊 {translations.language === 'en' ? 'View Reports' : 'ሪፖርቶችን ይመልከቱ'}
          </button>
          <button className="cancel-button" onClick={onClose}>
            {translations.language === 'en' ? 'Keep Current Items' : 'አሁኑን እቃዎች ይቀጥሉ'}
          </button>
        </div>
      </div>
    </div>
  );
}
