import {useState, useEffect} from "react";
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
    reminderOff: "OFF - No reminders"
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
    reminderOff: "ጠፍቷል - ማስታወሻ የለም"
  }
};

// Start with empty list - no static sample data
const sampleItems = [];

export default function App() {
  // STATE MANAGEMENT - These are like variables that React watches for changes
  const [items, setItems] = useState(sampleItems); // Main list of shopping items
  const [selectedItem, setSelectedItem] = useState(null); // Which item is selected for status update
  const [showModal, setShowModal] = useState(false); // Whether to show the status update modal
  const [showEditModal, setShowEditModal] = useState(false); // Whether to show the edit item modal
  const [showForm, setShowForm] = useState(false); // Whether to show the add item form
  const [showSettings, setShowSettings] = useState(false); // Whether to show settings panel
  const [showTopMenu, setShowTopMenu] = useState(false); // Whether to show top menu
  const [darkMode, setDarkMode] = useState(false); // Dark/Light mode toggle
  const [language, setLanguage] = useState('en'); // Language selection (en/am)
  const [shoppingDate, setShoppingDate] = useState(''); // When user plans to shop
  const [notificationsEnabled, setNotificationsEnabled] = useState(false); // Daily reminders
  const [marketDays, setMarketDays] = useState([]); // Selected market days (0=Sunday, 1=Monday, etc.)
  
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
    setItems(prevItems => [...prevItems, newItem]);
    
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
      setItems(prevItems => prevItems.filter(i => i.id !== item.id));
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
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === selectedItem.id ? updatedItem : item
      )
    );
    
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
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === selectedItem.id 
          ? { ...item, status: newStatus } // If this is the selected item, update its status
          : item // Otherwise, keep the item unchanged
      )
    );
    
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
    setDarkMode(!darkMode);
  }

  // TOGGLE LANGUAGE
  function toggleLanguage() {
    setLanguage(language === 'en' ? 'am' : 'en');
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

  // Load settings on app start
  useEffect(() => {
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
  }, []);

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
                </div>

                {/* About Section */}
                <div className="menu-section">
                  <div className="menu-section-title">{t.about}</div>
                  
                  <button 
                    className="menu-item"
                    onClick={() => {
                      alert(`Ethiopian Shopping List App v1.0.0\n\nDeveloped by:\n• Suleyman Abdu\n• Tesnim Nuru\n\nA modern, bilingual shopping list app designed specifically for Ethiopian users with market day notifications and Ethiopian Birr currency support.`);
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
                      const helpText = language === 'en' 
                        ? `How to Use:\n\n1. Click "+ Add New Item to Buy" to add items\n2. Set priority (1 = highest priority)\n3. Choose shopping date\n4. Click items to change status (Planned → Bought)\n5. Use ✏️ to edit, 🗑️ to delete\n6. Set market days in Settings for reminders\n\nTip: Lower priority numbers appear first!`
                        : `እንዴት መጠቀም:\n\n1. እቃዎችን ለመጨመር "+ አዲስ እቃ ያክሉ" ይጫኑ\n2. ቅድሚያ ያስቀምጡ (1 = ከፍተኛ ቅድሚያ)\n3. የግዢ ቀን ይምረጡ\n4. ሁኔታን ለመቀየር እቃዎችን ይጫኑ (የታቀደ → የተገዛ)\n5. ለማርም ✏️ ፣ ለመሰረዝ 🗑️ ይጠቀሙ\n6. ለማስታወሻ በቅንብሮች ውስጥ የገበያ ቀናትን ያስቀምጡ\n\nምክር: ዝቅተኛ ቅድሚያ ቁጥሮች በመጀመሪያ ይታያሉ!`;
                      alert(helpText);
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
