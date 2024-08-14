while true; do
    read -p "Do you want to continue? (Y/n): " userInput

    userInput=$(echo "$userInput" | tr '[:upper:]' '[:lower:]')

    case $userInput in
        y|yes)
            echo "_____________________________________________________"
            echo "Server started, from now all logs are from the server"
            echo "_____________________________________________________"
            node server.js
            break
            ;;
        n|no)
            echo "Download it from nodejs.org and reopen this"
            break
            ;;
        *)
            echo "Invalid input, please enter Y or n."
            ;;
    esac
done