// Function to fetch violations data from the API
const fetchViolations = async () => {
    try {
      const response = await fetch('/violations-data');
      const violations = await response.json();
      return violations;
    } catch (error) {
      console.error('Error fetching violations:', error);
    }
  };
  
  // Function to fetch GPS data from the API
  const fetchGpsData = async () => {
    try {
      const response = await fetch('/gps-data');
      const gpsData = await response.json();
      return gpsData;
    } catch (error) {
      console.error('Error fetching GPS data:', error);
    }
  };
  
  // Function to fetch user data from the API
  const fetchUsers = async () => {
    try {
      const response = await fetch('/get-users');
      const users = await response.json();
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
  // Function to fetch vehicle data from the API
  const fetchVehicles = async () => {
    try {
      const response = await fetch('/get-vehicle-data');
      const vehicles = await response.json();
      return vehicles;
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };
  
  // Function to fetch data from all endpoints and combine the data
  const fetchAndCombineData = async () => {
    try {
      const violations = await fetchViolations();
      const gpsData = await fetchGpsData();
      const users = await fetchUsers();
      const vehicles = await fetchVehicles();
  
      // Combine the data into a single array of objects
      const combinedData = violations.map(violation => {
        const user = users.find(u => u.user_id === violation.user_id);
        const gpsEntry = gpsData.find(g => g.location_id === violation.location_id);
        const vehicle = vehicles.find(v => v.vehicle_id === violation.vehicle_id);
  
        return {
          violationId: violation.violation_id,
          userFirstName: user.fist_name,
          userLastName: user.last_name,
          vehicleId: violation.vehicle_id,
          busColor: vehicle.bus_color,
          locationId: violation.location_id,
          latitude: gpsEntry.latitude,
          longitude: gpsEntry.longitude,
          timestamp: violation.timestamp,
          speedLimit: violation.speed_limit,
          violationType: violation.violation_type,
        };
      });
  
      return combinedData;
    } catch (error) {
      console.error('Error combining data:', error);
    }
  };
  
  // Function to render the combined data in the table
  const renderTable = async () => {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';
  
    const combinedData = await fetchAndCombineData();
  
    combinedData.forEach(data => {
      const row = document.createElement('tr');
  
      // Violation ID
      const violationIdCell = document.createElement('td');
      violationIdCell.textContent = data.violationId;
      row.appendChild(violationIdCell);
  
      // First Name
      const firstNameCell = document.createElement('td');
      firstNameCell.textContent = data.userFirstName;
      row.appendChild(firstNameCell);
  
      // Last Name
      const lastNameCell = document.createElement('td');
      lastNameCell.textContent = data.userLastName;
      row.appendChild(lastNameCell);
  
      // Vehicle ID
      const vehicleIdCell = document.createElement('td');
      vehicleIdCell.textContent = data.vehicleId;
      row.appendChild(vehicleIdCell);
  
      // Bus Color
      const busColorCell = document.createElement('td');
      busColorCell.textContent = data.busColor;
      row.appendChild(busColorCell);
  
      // Location ID
      const locationIdCell = document.createElement('td');
      locationIdCell.textContent = data.locationId;
      row.appendChild(locationIdCell);
  
      // Latitude
      const latitudeCell = document.createElement('td');
      latitudeCell.textContent = data.latitude;
      row.appendChild(latitudeCell);
  
      // Longitude
      const longitudeCell = document.createElement('td');
      longitudeCell.textContent = data.longitude;
      row.appendChild(longitudeCell);
  
      // Timestamp
      const timestampCell = document.createElement('td');
      timestampCell.textContent = data.timestamp;
      row.appendChild(timestampCell);
  
      // Speed Limit
      const speedLimitCell = document.createElement('td');
      speedLimitCell.textContent = data.speedLimit;
      row.appendChild(speedLimitCell);
  
      // Violation Type
      const violationTypeCell = document.createElement('td');
      violationTypeCell.textContent = data.violationType;
      row.appendChild(violationTypeCell);
  
      tableBody.appendChild(row);
    });
  };
  
  renderTable();